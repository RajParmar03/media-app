

// ---------------------------- Utils ---------------------------- //
import {
    ratio,
    getTransformedImageSize,
    rotateSize,
    rotatePoint
} from "advanced-cropper";

function getMaxSize(area, angle, aspectRatio) {
    const wrapper = rotateSize(
        {
            width: aspectRatio,
            height: 1
        },
        angle
    );
    return ratio(area) >= ratio(wrapper)
        ? {
            width: (area.height / wrapper.height) * aspectRatio,
            height: area.height / wrapper.height
        }
        : {
            width: (area.width / wrapper.width) * aspectRatio,
            height: area.width / wrapper.width
        };
}

export function defaultCoordinates({ crop } = {}) {
    const {
        center: { x, y },
        zoom,
        aspectRatio
    } = crop;

    return (state) => {
        const baseAspectRatio = aspectRatio
            ? 1 / aspectRatio
            : ratio(state.imageSize);

        const availableSpace = {
            left: (x > 0.5 ? 1 - x : x) * 2 * state.imageSize.width,
            top: (y > 0.5 ? 1 - y : y) * 2 * state.imageSize.height
        };

        const size = getMaxSize(
            {
                width: availableSpace.left / zoom,
                height: availableSpace.top / zoom
            },
            state.transforms.rotate,
            baseAspectRatio
        );

        let center = rotatePoint(
            {
                left: x * state.imageSize.width - state.imageSize.width / 2,
                top: y * state.imageSize.height - state.imageSize.height / 2
            },
            state.transforms.rotate
        );

        const transformedImageSize = rotateSize(
            state.imageSize,
            -state.transforms.rotate
        );

        return {
            ...size,
            top: center.top - size.height / 2 + transformedImageSize.height / 2,
            left: center.left - size.width / 2 + transformedImageSize.width / 2
        };
    };
}

export function defaultTransforms({ crop } = {}) {
    return () => ({
        flip: crop.flip,
        rotate: (crop.rotation * 180) / Math.PI
    });
}

export function getOutput(state) {
    const transformedImageSize = getTransformedImageSize(state);

    const center = rotatePoint(
        {
            left:
                state.coordinates.left +
                state.coordinates.width / 2 -
                transformedImageSize.width / 2,
            top:
                state.coordinates.top +
                state.coordinates.height / 2 -
                transformedImageSize.height / 2
        },
        -state.transforms.rotate
    );

    const percentCenter = {
        left: (center.left + state.imageSize.width / 2) / state.imageSize.width,
        top: (center.top + state.imageSize.height / 2) / state.imageSize.height
    };

    const normalizedCenter = {
        left:
            percentCenter.left > 0.5 ? 1 - percentCenter.left : percentCenter.left,
        top: percentCenter.top > 0.5 ? 1 - percentCenter.top : percentCenter.top
    };

    const availableSpace = {
        width: normalizedCenter.left * 2 * state.imageSize.width,
        height: normalizedCenter.top * 2 * state.imageSize.height
    };

    return {
        data: {
            crop: {
                flip: state.transforms.flip,
                rotation: (state.transforms.rotate * Math.PI) / 180,
                center: {
                    x: percentCenter.left,
                    y: percentCenter.top
                },
                zoom: Math.min(
                    availableSpace.width /
                    rotateSize(state.coordinates, -state.transforms.rotate).width,
                    availableSpace.height /
                    rotateSize(state.coordinates, -state.transforms.rotate).height
                ),
                aspectRatio: state.coordinates.height / state.coordinates.width
            }
        }
    };
}

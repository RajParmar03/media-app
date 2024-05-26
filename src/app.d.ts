
declare global {
    namespace App {
        interface ActionSuccess {
            type: 'success';
            message: string;
            data?: any;
        }
        interface ActionError {
            type: 'error';
            message: string;
            status: number;
            errors?: any;
        }
        type ActionResult = ActionSuccess | ActionError;
    }
}
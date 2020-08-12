import { message } from 'antd';

export default class notificationUtils {
    static DEFAULT_DURATION = 5.5;

    static success(text: string, duration?: number) {
        message.success(
            text,
            duration || this.DEFAULT_DURATION,
        );
    }

    static info(text: string, duration?: number) {
        message.info(
            text,
            duration || this.DEFAULT_DURATION,
        );
    }


    static warning(text: string, duration?: number) {
        message.warning(
            text,
            duration || this.DEFAULT_DURATION,
        );
    }


    static error(text: string, duration?: number) {
        message.error(
            text,
            duration || this.DEFAULT_DURATION,
        );
    }

    static loading(text: string) {
        message.loading(
            text,
            0,
        );
    }

    static destroy() {
        message.destroy();
    }
}

declare global {
    interface Window {
        visualViewport?: {
            height: number;
            width: number;
        };
    }
    interface Element {
        host: any;
    }
}
import { CustomScrollAction, Options } from './types';
declare const _default: (target: Element, options: Options) => CustomScrollAction[];
export default _default;

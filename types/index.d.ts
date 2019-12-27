import Vue, { PluginFunction } from "vue";
import { VueDecorator } from 'vue-class-component';

export interface IAsyncComputedOptions {
  errorHandler?: (error: string | Error) => void;
  useRawError?: boolean;
  default?: any;
}

export default class AsyncComputed {
  constructor(options?: IAsyncComputedOptions);
  static install: PluginFunction<never>;
  static version: string;
}

type AsyncComputedGetter<T> = () => Promise<T>;
interface IAsyncComputedValue<T> {
  default?: T | (() => T);
  get: AsyncComputedGetter<T>;
  watch?: string[] | (() => void);
  shouldUpdate?: () => boolean;
  lazy?: boolean;
}

export function AsyncComputedProp<T>(
  computedOptions?: IAsyncComputedValue<T>,
): VueDecorator

interface AsyncComputedObject {
  [K: string]: AsyncComputedGetter<any> | IAsyncComputedValue<any>;
}

declare module "vue/types/options" {
  interface ComponentOptions<V extends Vue> {
    asyncComputed?: AsyncComputedObject;
  }
}

interface IASyncComputedState {
  state: "updating" | "success" | "error";
  updating: boolean;
  success: boolean;
  error: boolean;
  exception: Error | null;
  update: () => void;
}

declare module "vue/types/vue" {
  interface Vue {
    $asyncComputed: { [K: string]: IASyncComputedState };
  }
}

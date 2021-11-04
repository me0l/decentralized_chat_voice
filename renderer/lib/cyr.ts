class Selector {
  public readonly element: Element | Document;

  constructor(
    selector: Element | Document | string,
    parent?: Element | Document
  ) {
    this.element =
      typeof selector === "string"
        ? (parent || document).querySelector(selector)
        : selector;
  }

  $(selector: Element | Document | string) {
    return new Selector(selector, this.element);
  }

  on<K extends keyof DocumentEventMap>(
    type: K,
    listener: (this: Document, ev: DocumentEventMap[K]) => any
  ) {
    this.element.addEventListener(type, listener);
  }

  click(listener: (ev: DocumentEventMap["click"]) => void) {
    this.on("click", listener);
  }

  input(listener: (ev: DocumentEventMap["input"]) => void) {
    this.on("input", listener);
  }

  submit(listener: (ev: DocumentEventMap["submit"]) => void) {
    this.on("submit", listener);
  }
}

type CyrHandlerConstructor = {
  (selector: string): Selector;
  on: <K extends keyof DocumentEventMap>(
    target: string,
    type: K,
    listener: (this: Document, ev: DocumentEventMap[K]) => any
  ) => void;
};

interface CyrPluginTypes {
  HANDLE_TYPE: CyrHandlerConstructor;
  SELECTOR_TYPE: Selector;
}

class CyrPlugin<T extends keyof CyrPluginTypes> {
  public readonly type: T;
  public readonly handler: (handler: CyrPluginTypes[T]) => void;

  constructor(type: T, handler: (handler: CyrPluginTypes[T]) => void) {
    this.type = type;
    this.handler = handler;
  }
}

interface CyrOptions {
  plugins: CyrPlugin<any>[];
}

function Cyr(opts?: CyrOptions) {
  const selectorPlugins = [];

  const handler = function (targetSelector: HTMLElement | Document | string) {
    const selector = new Selector(targetSelector);
    selectorPlugins.forEach((plugin) => {
      plugin.handler(selector);
    });

    return selector;
  };

  handler.on = function <K extends keyof DocumentEventMap>(
    type: K,
    listener: (this: Document, ev: DocumentEventMap[K]) => any
  ) {
    opts?.plugins.push(
      new CyrPlugin("SELECTOR_TYPE", function (handler) {
        handler.on(type, listener);
      })
    );
  };

  opts?.plugins.forEach((plugin) => {
    if (plugin.type === "HANDLE_TYPE") {
      plugin.handler(handler);
    }

    if (plugin.type === "SELECTOR_TYPE") {
      selectorPlugins.push(plugin);
    }
  });

  return handler;
}

(window as unknown as any).cyr = Cyr();

export default (window as unknown as any).cyr as CyrHandlerConstructor;

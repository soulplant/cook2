import { Action, applyMiddleware, compose, createStore } from "redux";
import { call, put, select, takeEvery } from "redux-saga/effects";

import createSagaMiddleware from "redux-saga";

export type Stublet<T> = {
  original: T;
  resolve(value?: any): void;
  reject(value?: any): void;
};

class SyncPromise {
  private thens: Function[] = [];
  private resolved = false;

  resolve(value: any): void {
    this.thens.forEach(f => f(value));
    this.resolved = true;
  }

  then(f: Function): SyncPromise {
    this.thens.push(f);
    return this;
  }

  catch(f: Function): SyncPromise {
    // TODO(james): Implement.
    return this;
  }
}

export type Stub<T> = T & { [P in keyof T]: Stublet<T[P]> };

export function makeStub<T>(obj: T): Stub<T> {
  let result = {};
  Object.keys(obj).forEach(key => {
    function wrapper(...args: any[]): any {
      const promise = new Promise((resolve, reject) => {
        wrapper["resolve"] = resolve;
        wrapper["reject"] = reject;
      });
      wrapper["promise"] = promise;
      return promise;
    }

    wrapper["original"] = obj[key];

    result[key] = wrapper;
  });
  return result as Stub<T>;
}

describe("stuff", () => {
  it("works", async () => {
    let fooDone = false;
    let barDone = false;

    const foo = makeStub({
      foo(): Promise<void> {
        throw "not implemented";
      },
      bar(): Promise<void> {
        throw "not implemented";
      },
    });

    foo
      .foo()
      .then(() => {
        fooDone = true;
        return foo.bar();
      })
      .then(() => {
        barDone = true;
      });

    expect(fooDone).toBe(false);
    expect(barDone).toBe(false);
    // Bar hasn't been called yet, so can't be resolved.
    expect(foo.bar.resolve).toBeUndefined();
    // Foo has though, so should be ready to be resolved.
    expect(foo.foo.resolve).toBeDefined();
    foo.foo.resolve();
    await delay();
    expect(fooDone).toBe(true);
    expect(barDone).toBe(false);
    expect(foo.bar.resolve).toBeDefined();
    foo.bar.resolve();
    await delay();
    expect(fooDone).toBe(true);
    expect(barDone).toBe(true);
  });
});

describe("test sagas", () => {
  it("stuff", async () => {
    const sagaMiddleware = createSagaMiddleware();

    const reducer = (
      state: string | undefined = "",
      action: Action
    ): string | undefined => {
      return action.type;
    };

    const store = createStore(
      reducer,
      compose(applyMiddleware(sagaMiddleware))
    );

    const api = {
      doSomething(): Promise<boolean> {
        throw "not implemented";
      },
    };

    type Api = typeof api;

    function* callServer(api: Api) {
      const result = yield call([api, api.doSomething]);
      // Do an arbitrary select to ensure that it doesn't introduce async
      // delays.
      yield select(state => state);
      if (result) {
        yield put({ type: "TRUE" });
      } else {
        yield put({ type: "FALSE" });
      }
    }

    const mockApi = makeStub(api);
    sagaMiddleware.run(function*(api: Api) {
      yield takeEvery("START", callServer, api);
    }, mockApi);

    store.dispatch({ type: "START" });
    expect(store.getState()).toBe("START");
    mockApi.doSomething.resolve(true);
    // The standard implementation of promises are inherently async, so need to
    // wait for an event loop before sync actions chained after are done.
    await delay();
    expect(store.getState()).toBe("TRUE");
  });
});

describe("promise tests", () => {
  it("async chains in promises", async () => {
    let res;
    const promise = new Promise(resolve => {
      res = resolve;
    });

    let p1 = false;
    let p2 = false;
    let p3 = false;
    promise
      .then(() => {
        p1 = true;
        return 5;
      })
      .then(() => {
        p2 = true;
        return new Promise(res => res());
      })
      .then(() => {
        p3 = true;
        return true;
      });

    expect(p1).toBe(false);
    expect(res).not.toBeNull();
    if (!res) {
      throw "error";
    }
    res();
    // Promises are inherently async, so need to wait before their .then()s run.
    expect(p1).toBe(false);
    await delay();
    // But resolved promises and values don't cause any extra async ticks.
    expect(p1).toBe(true);
    expect(p2).toBe(true);
    expect(p3).toBe(true);
  });

  it("resolved promises", async () => {
    let res;
    const resolvedAfter = new Promise(resolve => {
      res = resolve;
    });
    if (!res) {
      throw "error";
    }
    res();

    // Even if the .then() is attached after the promise is resolved, we still
    // need to wait.
    let resolvedAfterDone = false;
    resolvedAfter.then(() => (resolvedAfterDone = true));
    expect(resolvedAfterDone).toBe(false);
    await delay();
    expect(resolvedAfterDone).toBe(true);

    // Even if the promise is resolved in its own constructor, it still waits
    // for a tick.
    const resolvedInConstructor = new Promise(resolve => resolve());
    let resolvedInConstructorDone = false;
    resolvedInConstructor.then(() => {
      resolvedInConstructorDone = true;
    });
    expect(resolvedInConstructorDone).toBe(false);
    await delay();
    expect(resolvedInConstructorDone).toBe(true);
  });

  it("async functions", async () => {
    async function foo() {
      return 5;
    }

    let done = false;
    foo().then(() => {
      done = true;
    });
    // async functions work the same way as new Promise().
    expect(done).toBe(false);
    await delay();
    expect(done).toBe(true);
  });

  it("custom sync promises", async () => {
    const promise = new SyncPromise();

    let done = false;
    promise.then(() => {
      done = true;
    });
    // Obviously, if we write our own sync implementation of promises, then we
    // can make it behave however we want. It may be worth implementing promises
    // in this way so we don't have to remember to delay everywhere after we
    // resolve a mocked promise.
    promise.resolve(true);
    expect(done).toBe(true);
  });
});

function delay(): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve);
  });
}

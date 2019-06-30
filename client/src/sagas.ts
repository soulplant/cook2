import { call, put, takeEvery } from "redux-saga/effects";
import { initialLoadDone, INITIAL_LOAD_START } from "./actions";

export function* watchInitialLoad() {
  yield takeEvery(INITIAL_LOAD_START, performInitialLoad);
}

async function getFilesAsMap(
  fileNames: string[]
): Promise<{ [name: string]: string }> {
  const contents = await Promise.all(
    fileNames.map(async name => {
      const resp = await fetch(`./data/${name}.txt`);
      return await resp.text();
    })
  );
  const result: { [name: string]: string } = {};
  fileNames.forEach((name, i) => (result[name] = contents[i]));
  return result;
}

function getData(): Promise<{ [name: string]: string }> {
  return getFilesAsMap(["recipes", "measurements", "aisles"]);
}

function* performInitialLoad() {
  try {
    const data = yield call(getData);
    yield put(initialLoadDone(data));
  } catch (e) {
    document.body.innerHTML = "failed to load, please refresh";
  }
}

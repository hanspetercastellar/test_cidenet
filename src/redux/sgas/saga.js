import { call, put, fork, takeLatest, all, takeEvery } from 'redux-saga/effects'
import { actionsConst, success, successProducts } from '../reducers/product.reducer';
import Swal from "sweetalert2";



function* getAllProducts(){

    try {
        const response = yield fetch('https://ops.enerbit.dev/learning/api/v1/meters').then(res => res.json())
       yield put(successProducts(response.items))
        console.log(response);
    } catch(e) {

    }

}

function* postProduct({payload}) {
    try {
        const response = yield fetch('https://ops.enerbit.dev/learning/api/v1/meters',{
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(res => res.json())
            .catch(err => {
                console.log(err)
            })
        yield put(success(response))
    }catch (e) {

    }
}

function* patchProduct({payload}) {
    try {
        const response = yield fetch('https://ops.enerbit.dev/learning/api/v1/meters',{
            method: 'PATCH',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then(res => res.json())
            .catch(err => {
                console.log(err)
            })
        yield put(success(response))
        Swal.fire('The products has updated', '', 'info')
    }catch (e) {

    }
}

function* deleteProduct({id}) {
    try {
        const response = yield fetch('https://ops.enerbit.dev/learning/api/v1/meters/'+id,{
            method: 'DELETE',
            headers: {
              'content-type': 'application/json'
            }
        }).then(res => res.json())
            .then(res => {
                Swal.fire('Deleted', '', 'info')
            })
            .catch(err => {
                console.log(err)
            })
        console.log(response)
    }catch (e) {

    }


}
function* searchProduct({id}) {
    try {
        const response = yield fetch('https://ops.enerbit.dev/learning/api/v1/meters/'+id).then(res => res.json())
        yield put(successProducts(response.items))
        if (response.hasOwnProperty('detail')) {
            Swal.fire('Not found', '', 'info')
        }
        console.log(response);
    } catch(e) {

    }

}


function* sagasMain() {
   yield all([
        takeEvery(actionsConst.FETCH_ALL, getAllProducts),
        takeEvery(actionsConst.POST_PRODUCT, postProduct),
        takeEvery(actionsConst.PATCH_PRODUCT, patchProduct),
        takeEvery(actionsConst.DELETE_PRODUCT, deleteProduct),
        takeEvery(actionsConst.SEARCH_PRODUCT, searchProduct)
    ])
}

function* allSagas() {
    yield fork(sagasMain)
}

export default allSagas
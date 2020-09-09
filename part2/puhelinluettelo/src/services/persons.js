import axios from 'axios'
const baserUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baserUrl)
    return request.then(response => {
        return response.data
    })
}

const create = newObject => {
    const request = axios.post(baserUrl, newObject)
    return request.then(response => {
        return response.data
    })
}

const update = (id, newObject) => {
    const request = axios.put(`${baserUrl}/${id}`, newObject)
    return request.then(response => {
        return response.data
    })
}

const deleID = (id, newObject) => {
    const request = axios.delete(`${baserUrl}/${id}`, newObject)
    return request.then(response => {
        return response.data
    })
}



export default { getAll, create, update, deleID }
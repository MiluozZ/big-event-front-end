import request from '../utils/request'

export const addCategoryService = (categoryData) => {
    return request.post('/category', categoryData)
}

export const categoryListService = () => {
    return request.get('/category')
}

export const categoryDetailService = (id) => {
    return request.get('/category/detail?id=' + id);
}

export const categoryEditService = (categoryData) => {
    return request.put('/category', categoryData);
}

export const categoryDeleteService = (id) => {
    return request.delete('/category?id=' + id);
}
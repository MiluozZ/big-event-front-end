import request from '@/utils/request'

export const addArticleService = (ArticleData) => {
    return request.post('/articles', ArticleData)
}

export const articleListService = (articlePageInfo) => {
    return request.post('/article/list', articlePageInfo)
}

export const articleDetailService = (id) => {
    return request.get('/article/detail?id=' + id);
}

export const articleEditService = (articleData) => {
    return request.put('article', articleData);
}

export const articleDeleteService = (id) => {
    return request.delete('article?id=' + id);
}
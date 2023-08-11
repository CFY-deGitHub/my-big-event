import request from '@/utils/request'

// 获取频道列表的接口
export const artGetChannelService = () => request.get('/my/cate/list')
// 添加文章分类的接口
export const artAddChannelService = (data) => request.post('/my/cate/add', data)
// 编辑文章分类的接口
export const artEditChannelService = (data) =>
  request.put('/my/cate/info', data)
// 删除文章分类的接口
export const artDelChannelService = (id) =>
  request.delete('/my/cate/del', {
    params: { id }
  })

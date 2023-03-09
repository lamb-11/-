/*
  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果

  2:歌曲url获取接口
    请求地址:https://autumnfish.cn/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址
  3.歌曲详情获取
    请求地址:https://autumnfish.cn/song/detail
    请求方法:get
    请求参数:ids(歌曲id)
    响应内容:歌曲详情(包括封面信息)
  4.热门评论获取
    请求地址:https://autumnfish.cn/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论
  5.mv地址获取
    请求地址:https://autumnfish.cn/mv/url
    请求方法:get
    请求参数:id(mvid,为0表示没有mv)
    响应内容:mv的地址
*/
const frame = new Vue({
    el: '#frame',
    data: {
        userInput: '',      //用户输入
        songList: [],       //歌曲列表数组方式显示
        id: '',             //歌曲Id
        songUrl: '',        //g歌曲url
        pic: '',            //图片路径
        comment: [],        //热门评论
        playing: false,     //默认不动画
        showing: false,     //遮罩层显示
        mvUrl: ''
    },
    methods: {
        //搜索歌曲、明星时
        searchInput: function () {
            let that = this;
            //显示歌曲列表
            axios.get('https://autumnfish.cn/search?keywords=' + this.userInput).then(function (response) {
                that.songList = response.data.result.songs;
            }, function (err) {
                console.log(err);
            });
        },
        //点击播放
        listen: function (musicId) {
            let that = this;
            //歌曲播放
            axios.get('https://autumnfish.cn/song/url?id=' + musicId).then(function (response) {
                that.songUrl = response.data.data[0].url
            }, function (err) {
                console.log(err);
            });

            //歌曲背景图片设置
            axios.get('https://autumnfish.cn/song/detail?ids=' + musicId).then(function (response) {
                that.pic = response.data.songs[0].al.picUrl;
            }, function (err) {
                console.log(err);
            });

            //评论显示
            axios.get('https://autumnfish.cn/comment/hot?type=0&id=' + musicId).then(function (response) {
                that.comment = response.data.hotComments;
            }, function (err) {
                console.log(err);
            })
        },
        //动画暂停、播放
        play: function () {
            this.playing = true;
        },
        pause: function () {
            this.playing = false;
        },

        //mv
        getMv: function (mvid) {
            let that = this;
            axios.get('https://autumnfish.cn/mv/url?id=' + mvid).then(function (response) {
                that.showing = true;
                that.mvUrl = response.data.data.url;
            }, function (err) {
                console.log(err);
            })
        },

        //隐藏遮罩层
        hiddMask: function () {
            this.showing = false;
        }
    }
})
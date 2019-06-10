- about vue-video-player
pay attention to player type
eg.
```javaScript
    sources: [
                {
                // type: "video/webm", // ok,用ogg也可打开
                type: "video/ogg", // ok,用webm也可打开
                // type: "video/3gp", //ok
                // type: "video/mp4", // ok
                // type: "video/avi", //打不开
                // type: "video/flv", // 打不开
                // type: "video/mkv", // 打不开
                // type: "video/mov", // 打不开
                // type: "video/mpg", // 打不开
                // type: "video/swf", // 打不开
                // type: "video/ts", // 打不开
                // type: "video/wmv", // 打不开
                // type: "video/vob", // 没转化
                // type: "video/mxf", // 转化出错
                // type: "video/rm", // 转化出错
                src: '/static/video/Video_2018-05-15_105711.webm'//本地测试url地址
                // src: 'http://www.html5videoplayer.net/videos/madagascar3.mp4'//url地址
                }
              ],
```
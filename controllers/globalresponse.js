const response = {};
const path = require('path');
const axios = require('axios');
const geoip = require('geoip-lite');

const maxFeed = 9;
const thisyearstartedat = '1577836800';
const getFeeds = 50;

response.home = (req, res) => {
    console.log(req.url);
    res.sendFile(path.join(__dirname, '../public/index.html'));
};

response.isforeign = (req, res) => {
    const geo = geoip.lookup(req.ip);
    const Country = (geo ? geo.country : "Unknown");
    if(Country === "Unknown" || Country === "KR") {
        res.json({
            isforeign : false,
        });
    } else {
        res.json({
            isforeign : true,
        });
    }
};

response.getdata = async (req, res) => {
    const isForeign = req.body.isForeign;
    const username = req.body.username;
    const rowcols = req.body.rowcols;
    const result = await crawling(username);
    console.log(result.data);
    if (result.data.users.length === 0) {
        res.json({
            success: false,
            message: isForeign === false ? '검색결과가 존재하지 않습니다.' : 'Search results do not exist.',
        });
    } else if (result.data.users[0].user.is_private === true) {
        res.json({
            success: false,
            message: isForeign === false ? '비공개 사용자입니다. 결과를 공유하시려면 인스타 계정을 공개로 변경해주세요.' : 'Your account is private. If you want to share result. please change public your account.',
        });
    } else {
        const user_id = result.data.users[0].user.pk
        let feeds = await getuserfeeds(user_id, '');
        let has_next_page = feeds.data.data.user.edge_owner_to_timeline_media.page_info.has_next_page;
        let edges = feeds.data.data.user.edge_owner_to_timeline_media.edges;
        const user_images = new Array(0);

        for (let i = 0; i < edges.length; i++) {
            if (edges[i].node.taken_at_timestamp > thisyearstartedat) {
                user_images.push(edges[i]);
            }
        }

        while (has_next_page) {
            let image_count = 0;
            let end_cursor = feeds.data.data.user.edge_owner_to_timeline_media.page_info.end_cursor;
            feeds = await getuserfeeds(user_id, end_cursor);
            has_next_page = feeds.data.data.user.edge_owner_to_timeline_media.page_info.has_next_page;
            edges = feeds.data.data.user.edge_owner_to_timeline_media.edges;
            for (let i = 0; i < edges.length; i++) {
                if (edges[i].node.taken_at_timestamp > thisyearstartedat) {
                    user_images.push(edges[i]);
                    image_count++;
                }
            }
            if (image_count < getFeeds) {
                has_next_page = false;
            }
        }

        const mostliked_images = sortbyMostliked(user_images, rowcols);
        if (mostliked_images.length < (rowcols * rowcols)) {
            res.json({
                success: false,
                message: isForeign === false ? '결과화면에 가지고 올 이미지의 개수가 충분하지 않습니다.' : 'your feeds is not enough required images.',
            });
        } else {
            res.json({
                success: true,
                user_images: mostliked_images,
                username : username,
            });
        }

    }

};

response.uploadimg = (req, res) => {
    console.log('upload img');
    res.json({
        success: true,
    });
}

const crawling = (username) => {
    return axios({
        method: 'get',
        url: `https://www.instagram.com/web/search/topsearch/?query=${username}`,
        headers: {
            'Cookie': 'ig_did=DBA6C3B9-A2E7-4CB6-B87C-73DE93397AA9; csrftoken=Z6YSpwgoL5dBXDaPG6gORrhOCaFMGxEh; mid=X9RiQAAEAAG75EeCercU829JmxrF; ig_nrcb=1;'
        },
        withCredentials: true,
    });
};

const getuserfeeds = (user_id, end_cursor) => {
    let variables = `{"id":"${user_id}","first":${getFeeds}`;
    if (end_cursor !== '' || end_cursor !== null) {
        variables = `{"id":"${user_id}","first":${getFeeds},"after":"${end_cursor}"}`;
    }
    return axios({
        metgod: 'get',
        url: `https://www.instagram.com/graphql/query/`,
        params: {
            query_hash: '003056d32c2554def87228bc3fd9668a',
            variables: variables,
        },
        headers: {
            'Cookie': 'ig_did=DBA6C3B9-A2E7-4CB6-B87C-73DE93397AA9; csrftoken=Z6YSpwgoL5dBXDaPG6gORrhOCaFMGxEh; mid=X9RiQAAEAAG75EeCercU829JmxrF; ig_nrcb=1;'
        },
        withCredentials: true,
    })
};


const sortbyMostliked = (user_images, rowcols) => {
    const sorted = new Array(0);
    const most_liked = user_images.sort((a, b) => {
        return (b.node.edge_media_preview_like.count - a.node.edge_media_preview_like.count);
    });
    for (let i = 0; i < (rowcols * rowcols); i++) {
        sorted.push(most_liked[i]);
    }
    return sorted.filter(data => data !== undefined);
}

module.exports = response;

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

response.test = (req, res) => {
    console.log('Headers: ' + JSON.stringify(req.headers));
    console.log('IP: ' + JSON.stringify(req.ip));
    const geo = geoip.lookup(req.ip);
    console.log("Browser: " + req.headers["user-agent"]);
    console.log("Language: " + req.headers["accept-language"]);
    console.log("Country: " + (geo ? geo.country : "Unknown"));
    console.log("Region: " + (geo ? geo.region : "Unknown"));
    console.log(geo);
    res.status(200);
    res.header("Content-Type", 'application/json');
    res.end(JSON.stringify({status: "OK"}));
};

response.getdata = async (req, res) => {
    const username = req.body.username;
    const rowcols = req.body.rowcols;
    const result = await crawling(username);
    console.log(result.data);
    if (result.data.users.length === 0) {
        res.json({
            success: false,
            message: '검색결과가 존재하지 않습니다.'
        });
    } else if (result.data.users[0].user.is_private === true) {
        res.json({
            success: false,
            message: '비공개 사용자입니다. 결과를 공유하시려면 인스타 계정을 공개로 변경해주세요.'
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
                message: '결과화면에 가지고 올 이미지의 개수가 충분하지 않습니다.',
            });
        } else {
            res.json({
                success: true,
                user_images: mostliked_images,
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
            cookie: 'ig_did=7779B22C-07CB-49D6-9BF4-6FF79B670A9F; csrftoken=IeejgFkqM4PQmiOjWudGyjj69Xn8cKbt; mid=X-SwLwAEAAGfJdU4Iy9UNpwOzVUu; ig_nrcb=1',
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
            cookie: 'ig_did=7779B22C-07CB-49D6-9BF4-6FF79B670A9F; csrftoken=IeejgFkqM4PQmiOjWudGyjj69Xn8cKbt; mid=X-SwLwAEAAGfJdU4Iy9UNpwOzVUu; ig_nrcb=1',
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

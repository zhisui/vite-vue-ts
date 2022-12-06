window.mapConfig = {
    map: {
        id: 'baseMap',
        pixelRatio: 1,
        events: ['singleclick', 'pointermove']
    },
    view: {
        center: { coord: [120.55450697326916, 29.98121702454103], },
        zoom: 10.8,
        maxZoom: 15,
        minZoom: 8,
    },
    tdtLayer: [
        {
            name: 'tdt_sl_base',
            source: {
                type: "XYZ",
                url: "http://t{0-7}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&" +
                    "STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=59d3a78163c2741d6aa0cb12f77fa62a"
            }
        },
        {
            name: 'tdt_sl_txt',
            source: {
                type: "XYZ",
                url: "http://t{0-7}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&" +
                    "STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=59d3a78163c2741d6aa0cb12f77fa62a"
            }
        }
    ],
    baseLayer: [
        { //0 行政水系地图
            name: "sxMap",
            source: {
                type: "ImageArcGISRest",
                // url: "http://172.18.4.6:6080/arcgis/rest/services/sx/sxjcdt/MapServer",
                url: `https://kqszlw.kq.gov.cn:10443/map/arcgis/rest/services/sx/kqbjt/MapServer`, //柯桥
                params: {

                },
                projection: "EPSG:4326",
                visible: true
            },
            zIndex: 1,
        },
        { //1 区县
            name: "quxian",
            source: {
                type: "EsriJSON",
                url: "mapJson/柯桥区区县级行政区划4326.json",
                local: true,
                style: function () {
                    return {
                    };
                },
                visible: true
            },
            zIndex: 2,
        },
        { //2 乡镇
            name: "xiangzhen",
            source: {
                type: "EsriJSON",
                url: "mapJson/kqxz.json",
                local: true,
                style: function () {
                    return {
                    };
                },
                visible: false
            },
            zIndex: 3,
        },
        { //3 乡镇
            name: "kqxz",
            source: {
                type: "EsriJSON",
                url: "mapJson/柯桥区乡镇级行政区划4326.json",
                local: true,
                style: function () {
                    return {
                        stroke: {
                            color: '#73dfff'
                        },
                        fill: {
                            color: 'rgba(22, 58, 84, 0.2)'
                        }
                    };
                },
                visible: true
            },
            zIndex: 3,
        },

        { //4 百度地图
            name: "bd",
            source: {
                type: "XYZ",
                // projection: "GCJ02",
                url: "http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}",
                visible: false
            },
            zIndex: 1,
        },
    ]
};

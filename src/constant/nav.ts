


export const nav = [
    {//[0]
        title: "e企管企业",
        checked: false,
        expand: true,
        children: [
            { //[0 1]
                title: '印染企业',
                checked: false,
            },
            { //[0 2]
                title: '重点排污单位',
                checked: false,
                expand: true,

            },
            { //[0,3]
                title: '排污许可证简化管理',
                checked: false,
            },
            { //[0,4]
                title: '风险企业',
                checked: false,
            },
            { //[0,5]
                title: '近五年犯罪记录企业',
                checked: false,
            },
            { //[0,6]
                title: '双随机一公开企业',
                checked: false,
            },
        ],


    },
    {//1
        title: "智能发现",
        checked: false,
        expand: true,
        children: [
            {
                title: '废水',
                checked: true,
                children: [
                    {
                        title: '测试1',
                        checked: false,
                        children: [
                            {
                                title: '测试2.0',
                                checked: false,
                            },
                            {
                                title: '测试2.1',
                                checked: false,
                            },

                        ]
                    },
                ]
            },
            {
                title: '废气',
                checked: true,
            },
            {
                title: '固废',
                checked: false,
            },
            {
                title: '线索发现专题',
                checked: false,
            },
        ],
    },
    {//2
        title: "分级监管",
        checked: false,
        expand: true,
        children: [
            {
                title: '红码',
                checked: false,
            },
            {
                title: '黄码',
                checked: false,
            },
            {
                title: '绿码',
                checked: false,
            },
            {
                title: '正面清单',
                checked: false,
            },
            {
                title: '分级检查专题',
                checked: false,
            },
        ],
    },
    {//3
        title: "精准服务（印染企业）",
        checked: false,
        expand: true,
        children: [
            {
                title: '自查专题',
                checked: false,
            },
            {
                title: '学法积分专题',
                checked: false,
            },
            {
                title: '预警提醒专题',
                checked: false,
            },
            {
                title: '线上线下服务',
                checked: false,
            },
        ],
    },
];

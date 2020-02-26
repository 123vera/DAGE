// 常用数据验证规则
export const REG = {
  MOBILE: /^[0-9]{7,16}$/,
  EMAIL: /^[\w-.]+@([\w-]+\.)+[a-zA-Z]+$/,
  ACCOUNT_NAME: /^(?!\d+$)(?![A-Za-z]+$)[a-zA-Z0-9]{6,12}$/, // 6-12 位英文和数字（英文数字都要有，忽略大小写）
  PASSWORD: /^(?!\d+$)(?![A-Za-z]+$)[a-zA-Z0-9]{8,16}$/, // 8-16 位英文和数字（英文数字都要有，忽略大小写）
  // PASSWORD: /^(?!\d+$)(?![A-Za-z]+$)(?![A-Z0-9]+$)(?![a-z0-9]+$)[a-zA-Z0-9]{8,16}$/,  // 8-16 位英文和数字（英文数字都要有，且必须包含大小写）
  // PASSWORD: /^[a-zA-Z0-9]{8,16}$/,  // 8-16 位英文和数字（只验证位数）
  // WALLET_REMARK: /^[a-zA-Z0-9]{3,42}$/,  // 3-42 位英文和数字（只验证位数）
  // WALLET_ADDRESS: /^(?=[0-9a-z\-.]*$)/, // 3-42位小写字母、数字、中划线(-)、点(.) 4种类型
  // WALLET_REMARK: /^(?=[0-9a-zA-Z]*$)/, // 3-42 位英文和数字（只验证位数）
  NUMBER: /^-?\d+(.\d+)?$/,
  INPUT_GROUP: /^[a-z0-9A-Z]+$/, // 数字字母大小写
  URL: /^https?:\/\//,
  IP: /^([0-9]{1,3})(\.[0-9]{1,3}){3}$/,
  GOOGLE_AUTH: /^[0-9]{6}$/,
  WALLET: /^[a-zA-Z0-9]{20,100}$/,
  ETH_WALLET: /^0(x|X)[0-9a-fA-F]{40}$/,
  BTC_WALLET_1: /^1[0-9a-zA-Z]{25,33}$/,
  BTC_WALLET_3: /^3[0-9a-zA-Z]{33}$/,
};

export const COUNTRIES_LIST = [
  'China中国',
  'Hong Kong香港',
  'Taiwan台湾',
  'Macao澳门',
  'United States of America (USA)美国',
  'Argentina阿根廷',
  'Andorra安道尔',
  'United Arab Emirates阿联酋',
  'Afghanistan阿富汗',
  'Antigua & Barbuda安提瓜和巴布达',
  'Anguilla安圭拉',
  'Albania阿尔巴尼亚',
  'Armenia亚美尼亚',
  'Angola安哥拉',
  'Antarctica南极洲',
  'American Samoa美属萨摩亚',
  'Austria奥地利',
  'Australia澳大利亚',
  'Aruba阿鲁巴',
  'Aland Island奥兰群岛',
  'Azerbaijan阿塞拜疆',
  'Bosnia & Herzegovina波黑',
  'Barbados巴巴多斯',
  'Bangladesh孟加拉',
  'Belgium比利时',
  'Burkina布基纳法索',
  'Bulgaria保加利亚',
  'Bahrain巴林',
  'Burundi布隆迪',
  'Benin贝宁',
  'Saint Barthélemy圣巴泰勒米岛',
  'Bermuda百慕大',
  'Brunei文莱',
  'Bolivia玻利维亚',
  'Caribbean Netherlands荷兰加勒比区',
  'Brazil巴西',
  'The Bahamas巴哈马',
  'Bhutan不丹',
  'Bouvet Island布韦岛',
  'Botswana博茨瓦纳',
  'Belarus白俄罗斯',
  'Belize伯利兹',
  'Canada加拿大',
  'Cocos (Keeling) Islands科科斯群岛',
  'Democratic Republic of the Congo刚果（金）',
  'Central African Republic中非',
  'Republic of the Congo刚果（布）',
  'Switzerland瑞士',
  "Cote d'Ivoire科特迪瓦",
  'Cook Islands库克群岛',
  'Chile智利',
  'Cameroon喀麦隆',
  'Colombia哥伦比亚',
  'Costa Rica哥斯达黎加',
  'Cuba古巴',
  'Cape Verde佛得角',
  'Curacao库拉索',
  'Christmas Island圣诞岛',
  'Cyprus塞浦路斯',
  'Czech Republic捷克',
  'Germany德国',
  'Djibouti吉布提',
  'Denmark丹麦',
  'Dominica多米尼克',
  'Dominican Republic多米尼加',
  'Algeria阿尔及利亚',
  'Ecuador厄瓜多尔',
  'Estonia爱沙尼亚',
  'Egypt埃及',
  'Western Sahara西撒哈拉',
  'Eritrea厄立特里亚',
  'Spain西班牙',
  'Ethiopia埃塞俄比亚',
  'Finland芬兰',
  'Fiji斐济群岛',
  'Falkland Islands马尔维纳斯群岛（福克兰）',
  'Federated States of Micronesia密克罗尼西亚联邦',
  'Faroe Islands法罗群岛',
  'France法国 法国',
  'Gabon加蓬',
  'Great Britain (United Kingdom; England)英国',
  'Grenada格林纳达',
  'Georgia格鲁吉亚',
  'French Guiana法属圭亚那',
  'Guernsey根西岛',
  'Ghana加纳',
  'Gibraltar直布罗陀',
  'Greenland格陵兰',
  'Gambia冈比亚',
  'Guinea几内亚',
  'Guadeloupe瓜德罗普',
  'Equatorial Guinea赤道几内亚',
  'Greece希腊',
  'South Georgia and the South Sandwich Islands南乔治亚岛和南桑威奇群岛',
  'Guatemala危地马拉',
  'Guam关岛',
  'Guinea-Bissau几内亚比绍',
  'Guyana圭亚那',
  'Heard Island and McDonald Islands赫德岛和麦克唐纳群岛',
  'Honduras洪都拉斯',
  'Croatia克罗地亚',
  'Haiti海地',
  'Hungary匈牙利',
  'Indonesia印尼',
  'Ireland爱尔兰',
  'Israel以色列',
  'Isle of Man马恩岛',
  'India印度',
  'British Indian Ocean Territory英属印度洋领地',
  'Iraq伊拉克',
  'Iran伊朗',
  'Iceland冰岛',
  'Italy意大利',
  'Jersey泽西岛',
  'Jamaica牙买加',
  'Jordan约旦',
  'Japan日本',
  'Kenya肯尼亚',
  'Kyrgyzstan吉尔吉斯斯坦',
  'Cambodia柬埔寨',
  'Kiribati基里巴斯',
  'The Comoros科摩罗',
  'St. Kitts & Nevis圣基茨和尼维斯',
  'North Korea朝鲜',
  'South Korea韩国',
  'Kuwait科威特',
  'Cayman Islands开曼群岛',
  'Kazakhstan哈萨克斯坦',
  'Laos老挝',
  'Lebanon黎巴嫩',
  'St. Lucia圣卢西亚',
  'Liechtenstein列支敦士登',
  'Sri Lanka斯里兰卡',
  'Liberia利比里亚',
  'Lesotho莱索托',
  'Lithuania立陶宛',
  'Luxembourg卢森堡',
  'Latvia拉脱维亚',
  'Libya利比亚',
  'Morocco摩洛哥',
  'Monaco摩纳哥',
  'Moldova摩尔多瓦',
  'Montenegro黑山',
  'Saint Martin (France)法属圣马丁',
  'Madagascar马达加斯加',
  'Marshall islands马绍尔群岛',
  'Republic of Macedonia (FYROM)马其顿',
  'Mali马里',
  'Myanmar (Burma)缅甸',
  'Mongolia蒙古国',
  'Northern Mariana Islands北马里亚纳群岛',
  'Martinique马提尼克',
  'Mauritania毛里塔尼亚',
  'Montserrat蒙塞拉特岛',
  'Malta马耳他',
  'Mauritius毛里求斯',
  'Maldives马尔代夫',
  'Malawi马拉维',
  'Mexico墨西哥',
  'Malaysia马来西亚',
  'Mozambique莫桑比克',
  'Namibia纳米比亚',
  'New Caledonia新喀里多尼亚',
  'Niger尼日尔',
  'Norfolk Island诺福克岛',
  'Nigeria尼日利亚',
  'Nicaragua尼加拉瓜',
  'Netherlands荷兰',
  'Norway挪威',
  'Nepal尼泊尔',
  'Nauru瑙鲁',
  'Niue纽埃',
  'New Zealand新西兰',
  'Oman阿曼',
  'Panama巴拿马',
  'Peru秘鲁',
  'French polynesia法属波利尼西亚',
  'Papua New Guinea巴布亚新几内亚',
  'The Philippines菲律宾',
  'Pakistan巴基斯坦',
  'Poland波兰',
  'Saint-Pierre and Miquelon圣皮埃尔和密克隆',
  'Pitcairn Islands皮特凯恩群岛',
  'Puerto Rico波多黎各',
  'Palestinian territories巴勒斯坦',
  'Portugal葡萄牙',
  'Palau帕劳',
  'Paraguay巴拉圭',
  'Qatar卡塔尔',
  'Réunion留尼汪',
  'Romania罗马尼亚',
  'Serbia塞尔维亚',
  'Russian Federation俄罗斯',
  'Rwanda卢旺达',
  'Saudi Arabia沙特阿拉伯',
  'Solomon Islands所罗门群岛',
  'Seychelles塞舌尔',
  'Sudan苏丹',
  'Sweden瑞典',
  'Singapore新加坡',
  'St. Helena & Dependencies圣赫勒拿',
  'Slovenia斯洛文尼亚',
  'Svalbard and Jan Mayen斯瓦尔巴群岛和扬马延岛',
  'Slovakia斯洛伐克',
  'Sierra Leone塞拉利昂',
  'San Marino圣马力诺',
  'Senegal塞内加尔',
  'Somalia索马里',
  'Suriname苏里南',
  'South Sudan南苏丹',
  'Sao Tome & Principe圣多美和普林西比',
  'El Salvador萨尔瓦多',
  'Sint Maarten荷属圣马丁',
  'Syria叙利亚',
  'Swaziland斯威士兰',
  'Turks & Caicos Islands特克斯和凯科斯群岛',
  'Chad乍得',
  'French Southern Territories法属南部领地',
  'Togo多哥',
  'Thailand泰国',
  'Tajikistan塔吉克斯坦',
  'Tokelau托克劳',
  'Timor-Leste (East Timor)东帝汶',
  'Turkmenistan土库曼斯坦',
  'Tunisia突尼斯',
  'Tonga汤加',
  'Turkey土耳其',
  'Trinidad & Tobago特立尼达和多巴哥',
  'Tuvalu图瓦卢',
  'Tanzania坦桑尼亚',
  'Ukraine乌克兰',
  'Uganda乌干达',
  'United States Minor Outlying Islands美国本土外小岛屿',
  'Uruguay乌拉圭',
  'Uzbekistan乌兹别克斯坦',
  'Vatican City (The Holy See)梵蒂冈',
  'St. Vincent & the Grenadines圣文森特和格林纳丁斯',
  'Venezuela委内瑞拉',
  'British Virgin Islands英属维尔京群岛',
  'United States Virgin Islands美属维尔京群岛',
  'Vietnam越南',
  'Vanuatu瓦努阿图',
  'Wallis and Futuna瓦利斯和富图纳',
  'Samoa萨摩亚',
  'Yemen也门',
  'Mayotte马约特',
  'South Africa南非',
  'Zambia赞比亚',
  'Zimbabwe津巴布韦',
];

/* 验证码倒计时 */
export const COUNT_DOWN = 10;

/* Toast 出现时间 */
export const TOAST_DURATION = 2;

/* 每页条数 */
export const PAGE_SIZE = 3;

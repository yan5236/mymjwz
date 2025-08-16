export interface Quote {
  id: number
  content: string
  author: string
  source: string
  category: string
  tags: string[]
}

export const quotes: Quote[] = [
  {
    id: 1,
    content: "路漫漫其修远兮，吾将上下而求索。",
    author: "屈原",
    source: "离骚",
    category: "励志",
    tags: ["坚持", "求知", "人生"],
  },
  {
    id: 2,
    content: "天行健，君子以自强不息。",
    author: "周易",
    source: "乾卦",
    category: "励志",
    tags: ["自强", "坚持", "品格"],
  },
  {
    id: 3,
    content: "知之者不如好之者，好之者不如乐之者。",
    author: "孔子",
    source: "论语",
    category: "学习",
    tags: ["学习", "兴趣", "态度"],
  },
  {
    id: 4,
    content: "海内存知己，天涯若比邻。",
    author: "王勃",
    source: "送杜少府之任蜀州",
    category: "友情",
    tags: ["友谊", "距离", "情感"],
  },
  {
    id: 5,
    content: "山重水复疑无路，柳暗花明又一村。",
    author: "陆游",
    source: "游山西村",
    category: "人生感悟",
    tags: ["希望", "转机", "坚持"],
  },
  {
    id: 6,
    content: "落红不是无情物，化作春泥更护花。",
    author: "龚自珍",
    source: "己亥杂诗",
    category: "人生感悟",
    tags: ["奉献", "价值", "生命"],
  },
  {
    id: 7,
    content: "业精于勤，荒于嬉；行成于思，毁于随。",
    author: "韩愈",
    source: "进学解",
    category: "学习",
    tags: ["勤奋", "思考", "成功"],
  },
  {
    id: 8,
    content: "千里之行，始于足下。",
    author: "老子",
    source: "道德经",
    category: "励志",
    tags: ["行动", "开始", "坚持"],
  },
  {
    id: 9,
    content: "人生自古谁无死，留取丹心照汗青。",
    author: "文天祥",
    source: "过零丁洋",
    category: "人生感悟",
    tags: ["忠诚", "品格", "历史"],
  },
  {
    id: 10,
    content: "桃李满天下，春晖遍四方。",
    author: "佚名",
    source: "",
    category: "友情",
    tags: ["师生", "感恩", "传承"],
  },
]

export const categories = ["全部", "励志", "人生感悟", "爱情", "友情", "成功", "学习", "时间", "梦想", "坚持"]

export function filterQuotes(quotes: Quote[], searchTerm: string, category: string): Quote[] {
  return quotes.filter((quote) => {
    const matchesSearch =
      searchTerm === "" ||
      quote.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = category === "全部" || quote.category === category

    return matchesSearch && matchesCategory
  })
}

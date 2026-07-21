// 하루 한 물음 — 질문과 답(어록) 데이터
// 각 항목: question(질문), answer(어록), philosopher(이름), source(출처)
const QUOTES = [
  {
    question: "나는 정말 무엇을 알고 있는가?",
    answer: "나는 내가 아무것도 모른다는 것을 안다.",
    philosopher: "소크라테스",
    source: "플라톤 「소크라테스의 변명」"
  },
  {
    question: "성찰 없이 사는 삶은 어떤 삶인가?",
    answer: "성찰하지 않는 삶은 살 가치가 없다.",
    philosopher: "소크라테스",
    source: "플라톤 「소크라테스의 변명」"
  },
  {
    question: "군자와 소인은 무엇으로 갈리는가?",
    answer: "군자는 의리에 밝고, 소인은 이익에 밝다.",
    philosopher: "공자",
    source: "「논어」 里仁"
  },
  {
    question: "배우기만 하고 생각하지 않으면 어떻게 되는가?",
    answer: "배우기만 하고 생각하지 않으면 얻는 것이 없고, 생각만 하고 배우지 않으면 위태롭다.",
    philosopher: "공자",
    source: "「논어」 爲政"
  },
  {
    question: "자신이 원치 않는 일을 남에게 해도 되는가?",
    answer: "내가 원치 않는 일을 남에게 베풀지 말라.",
    philosopher: "공자",
    source: "「논어」 衛靈公"
  },
  {
    question: "먼 길을 가는 자는 무엇을 두려워해야 하는가?",
    answer: "천천히 가는 것을 두려워하지 말고, 멈추는 것을 두려워하라.",
    philosopher: "공자",
    source: "「논어」 전승 구절"
  },
  {
    question: "누가 꿈을 꾸고 있는가?",
    answer: "내가 나비의 꿈을 꾼 것인지, 나비가 나의 꿈을 꾸는 것인지 알 수 없다.",
    philosopher: "장자",
    source: "「장자」 齊物論, 호접지몽"
  },
  {
    question: "쓸모없는 것은 정말 쓸모가 없는가?",
    answer: "사람들은 쓸모 있음의 쓸모는 알아도, 쓸모없음의 쓸모는 알지 못한다.",
    philosopher: "장자",
    source: "「장자」 人間世"
  },
  {
    question: "우물 안 개구리에게 바다를 말할 수 있는가?",
    answer: "우물 안 개구리에게 바다를 말할 수 없는 것은, 그가 좁은 곳에 갇혀 있기 때문이다.",
    philosopher: "장자",
    source: "「장자」 秋水"
  },
  {
    question: "최고의 선은 무엇을 닮았는가?",
    answer: "최고의 선은 물과 같다. 물은 만물을 이롭게 하면서도 다투지 않는다.",
    philosopher: "노자",
    source: "「도덕경」 8장, 上善若水"
  },
  {
    question: "만족을 아는 자는 어떤 사람인가?",
    answer: "만족을 아는 자는 부유하다.",
    philosopher: "노자",
    source: "「도덕경」 33장"
  },
  {
    question: "천하에서 가장 부드러운 것은 무엇을 이기는가?",
    answer: "천하에 물보다 부드러운 것은 없지만, 굳고 강한 것을 공략하는 데는 물을 이길 것이 없다.",
    philosopher: "노자",
    source: "「도덕경」 78장"
  },
  {
    question: "천 리 길은 어디서 시작되는가?",
    answer: "천 리 길도 한 걸음에서 시작된다.",
    philosopher: "노자",
    source: "「도덕경」 64장"
  },
  {
    question: "우리가 보는 세계는 진짜인가?",
    answer: "우리가 보는 세계는 동굴 벽에 비친 그림자에 불과하다.",
    philosopher: "플라톤",
    source: "「국가」 동굴의 비유"
  },
  {
    question: "정의로운 삶과 부정한 삶, 무엇이 더 행복한가?",
    answer: "정의로운 자가 부정한 자보다 더 행복하다.",
    philosopher: "플라톤",
    source: "「국가」"
  },
  {
    question: "배운다는 것은 결국 무엇을 떠올리는 일인가?",
    answer: "배움이란 새로 얻는 것이 아니라 이미 알던 것을 다시 떠올리는 것이다.",
    philosopher: "플라톤",
    source: "「메논」"
  },
  {
    question: "죽음을 두려워하는 것은 지혜로운가?",
    answer: "죽음을 두려워하는 것은 알지 못하는 것을 안다고 여기는 것과 같다.",
    philosopher: "소크라테스",
    source: "플라톤 「소크라테스의 변명」"
  },
  {
    question: "완전한 원은 어디에 있는가?",
    answer: "우리가 손으로 그리는 원은 그림자일 뿐, 완전한 원은 오직 마음속에만 있다.",
    philosopher: "플라톤",
    source: "이데아론"
  }
];

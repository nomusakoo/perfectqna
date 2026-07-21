// 하루 한 물음 — 질문과 답(어록) 데이터
// 각 항목: question(질문), answer(어록), philosopher(이름), source(출처)
const QUOTES = [
  // 소크라테스
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
    question: "죽음을 두려워하는 것은 지혜로운가?",
    answer: "죽음을 두려워하는 것은 알지 못하는 것을 안다고 여기는 것과 같다.",
    philosopher: "소크라테스",
    source: "플라톤 「소크라테스의 변명」"
  },

  // 플라톤
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
    question: "완전한 원은 어디에 있는가?",
    answer: "우리가 손으로 그리는 원은 그림자일 뿐, 완전한 원은 오직 마음속에만 있다.",
    philosopher: "플라톤",
    source: "이데아론"
  },

  // 아리스토텔레스
  {
    question: "탁월함은 타고나는 것인가?",
    answer: "우리는 반복해서 행하는 대로의 존재다. 탁월함은 행위가 아니라 습관이다.",
    philosopher: "아리스토텔레스",
    source: "「니코마코스 윤리학」"
  },
  {
    question: "행복은 다른 무언가를 위한 수단인가?",
    answer: "행복은 그 자체가 목적이며, 다른 어떤 것을 위한 수단이 아니다.",
    philosopher: "아리스토텔레스",
    source: "「니코마코스 윤리학」"
  },
  {
    question: "인간은 혼자서 완전할 수 있는가?",
    answer: "인간은 본성적으로 폴리스적 동물이다.",
    philosopher: "아리스토텔레스",
    source: "「정치학」"
  },

  // 공자
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
    question: "진짜 잘못이란 무엇인가?",
    answer: "잘못을 하고도 고치지 않는 것, 이것을 진짜 잘못이라 한다.",
    philosopher: "공자",
    source: "「논어」 衛靈公"
  },
  {
    question: "지나친 것과 부족한 것, 어느 쪽이 나은가?",
    answer: "지나침은 미치지 못함과 같다.",
    philosopher: "공자",
    source: "「논어」 先進"
  },

  // 맹자
  {
    question: "인간의 본성은 원래 선한가?",
    answer: "측은히 여기는 마음이 없다면 사람이 아니다.",
    philosopher: "맹자",
    source: "「맹자」 公孫丑上"
  },

  // 노자
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
    question: "진짜 아는 사람은 어떻게 말하는가?",
    answer: "아는 자는 말하지 않고, 말하는 자는 알지 못한다.",
    philosopher: "노자",
    source: "「도덕경」 56장"
  },

  // 장자
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
    question: "우리는 무엇을 당연하게 여기며 사는가?",
    answer: "물고기는 물속에 있으면서 물을 잊고, 사람은 도 안에 있으면서 도를 잊는다.",
    philosopher: "장자",
    source: "「장자」 大宗師"
  },

  // 붓다
  {
    question: "변하지 않는 것이 있는가?",
    answer: "모든 것은 변한다. 게으르지 말고 부지런히 정진하라.",
    philosopher: "붓다",
    source: "「대반열반경」, 최후의 유훈"
  },
  {
    question: "나누어도 줄어들지 않는 것은 무엇인가?",
    answer: "천 개의 촛불이 하나의 촛불에서 불을 얻어도, 그 하나의 촛불은 짧아지지 않는다.",
    philosopher: "붓다",
    source: "전승"
  },
  {
    question: "분노는 결국 누구를 태우는가?",
    answer: "분노를 품는 것은 남에게 던지려고 뜨거운 숯을 쥐고 있는 것과 같다. 먼저 데는 것은 자기 자신이다.",
    philosopher: "붓다",
    source: "전승"
  },

  // 마르쿠스 아우렐리우스
  {
    question: "행복한 삶을 위해 정말 많은 것이 필요한가?",
    answer: "행복한 삶을 위해 필요한 것은 아주 적다. 모든 것은 네 안에, 네가 생각하는 방식 안에 있다.",
    philosopher: "마르쿠스 아우렐리우스",
    source: "「명상록」"
  },
  {
    question: "누군가 나에게 잘못을 저질렀을 때, 가장 좋은 되갚음은 무엇인가?",
    answer: "최고의 복수는 잘못을 저지른 자와 같은 사람이 되지 않는 것이다.",
    philosopher: "마르쿠스 아우렐리우스",
    source: "「명상록」 전승"
  },

  // 에픽테토스
  {
    question: "고통은 사건에서 오는가, 생각에서 오는가?",
    answer: "인간을 괴롭히는 것은 사건 자체가 아니라, 그 사건에 대한 그의 생각이다.",
    philosopher: "에픽테토스",
    source: "「엥케이리디온」"
  },
  {
    question: "내가 통제할 수 있는 것은 무엇인가?",
    answer: "우리에게 달린 것과 달리지 않은 것을 먼저 구별하라.",
    philosopher: "에픽테토스",
    source: "「엥케이리디온」"
  },

  // 세네카
  {
    question: "인생이 짧은 것인가, 우리가 낭비하는 것인가?",
    answer: "우리는 짧은 인생을 받은 것이 아니라, 인생의 많은 부분을 낭비하고 있을 뿐이다.",
    philosopher: "세네카",
    source: "「인생의 짧음에 관하여」"
  },
  {
    question: "오늘 하루를 마지막 하루처럼 산다면?",
    answer: "매일을 인생 전체인 것처럼 준비하라.",
    philosopher: "세네카",
    source: "「루킬리우스에게 보내는 편지」"
  },

  // 헤라클레이토스
  {
    question: "지금 이 순간은 다시 오는가?",
    answer: "같은 강물에 두 번 발을 담글 수 없다.",
    philosopher: "헤라클레이토스",
    source: "단편 전승"
  },
  {
    question: "변하지 않는 것을 붙잡으려 하면 무엇을 놓치는가?",
    answer: "만물은 흐른다.",
    philosopher: "헤라클레이토스",
    source: "단편 전승, 판타 레이"
  },

  // 디오게네스
  {
    question: "정말로 필요한 것은 얼마나 적은가?",
    answer: "내가 원하는 것은 당신이 내 햇빛을 가리지 않는 것, 그것뿐이오.",
    philosopher: "디오게네스",
    source: "알렉산더 대왕과의 일화, 전승"
  },
  {
    question: "정직한 사람은 어디에 있는가?",
    answer: "대낮에 등불을 들고서 정직한 사람을 찾아다녔다.",
    philosopher: "디오게네스",
    source: "전승"
  },

  // 니체
  {
    question: "고통은 나를 무너뜨리는가, 단련시키는가?",
    answer: "나를 죽이지 못하는 것은 나를 더 강하게 만든다.",
    philosopher: "니체",
    source: "「우상의 황혼」"
  },
  {
    question: "'왜' 살아야 하는지 안다면, '어떻게'는 견딜 수 있는가?",
    answer: "왜 살아야 하는지 아는 사람은 거의 모든 어떻게도 견뎌낼 수 있다.",
    philosopher: "니체",
    source: "「우상의 황혼」"
  },
  {
    question: "혼돈 없이 새로운 것이 태어날 수 있는가?",
    answer: "춤추는 별을 낳으려면, 자기 안에 혼돈을 지녀야 한다.",
    philosopher: "니체",
    source: "「차라투스트라는 이렇게 말했다」"
  },

  // 스피노자
  {
    question: "감정에 휩쓸리는 대신 할 수 있는 일은 무엇인가?",
    answer: "슬퍼하지도 웃지도 말고, 다만 이해하라.",
    philosopher: "스피노자",
    source: "「정치론」"
  },

  // 칸트
  {
    question: "내가 하는 행동을 모두가 한다면 세상은 어떻게 될까?",
    answer: "네 의지의 준칙이 언제나 동시에 보편적 입법의 원리가 될 수 있도록 행위하라.",
    philosopher: "칸트",
    source: "「실천이성비판」, 정언명령"
  },
  {
    question: "나는 스스로 생각하기를 두려워하고 있지 않은가?",
    answer: "과감히 알려고 하라. 스스로의 지성을 사용할 용기를 가져라.",
    philosopher: "칸트",
    source: "「계몽이란 무엇인가에 대한 답변」"
  },

  // 키에르케고르
  {
    question: "지금 이 순간의 의미는 언제 분명해지는가?",
    answer: "인생은 앞으로 살아지지만, 오직 뒤돌아봐야만 이해된다.",
    philosopher: "키에르케고르",
    source: "일기, 전승"
  },

  // 카뮈
  {
    question: "의미 없어 보이는 반복 속에서도 행복할 수 있는가?",
    answer: "산을 오르는 것 자체가 인간의 마음을 채우기에 충분하다. 시지프는 행복하다고 상상해야 한다.",
    philosopher: "카뮈",
    source: "「시지프 신화」"
  },

  // 사르트르
  {
    question: "선택하지 않는 것도 하나의 선택인가?",
    answer: "인간은 자유롭도록 저주받았다.",
    philosopher: "사르트르",
    source: "「존재와 무」"
  },

  // 비트겐슈타인
  {
    question: "말로 다 담을 수 없는 것도 있는가?",
    answer: "말할 수 없는 것에 대해서는 침묵해야 한다.",
    philosopher: "비트겐슈타인",
    source: "「논리철학논고」"
  },

  // 루미
  {
    question: "내가 정말 살고 있는 시간은 언제인가?",
    answer: "어제는 지나갔고 내일은 아직 오지 않았다. 오직 오늘만이 있을 뿐이다.",
    philosopher: "루미",
    source: "전승"
  }
];

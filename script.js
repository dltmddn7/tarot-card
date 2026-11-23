/* =========================================================
   신비로운 심야 타로 리딩 — script.js
   ========================================================= */

/* ---------- 1. 메이저 아르카나 22장 데이터 ---------- */
// up: 정방향 / rev: 역방향
// love: 연애운, career: 취업·학업운, money: 금전운, advice: 오늘의 조언
const TAROT_CARDS = [
  {
    id: 0, numeral: "0", name: "바보", en: "The Fool", symbol: "🎒",
    colors: ["#3b2a78", "#120f33", "rgba(160, 220, 255, 0.45)"],
    keywords: { up: ["새로운 시작", "자유", "순수함", "모험"], rev: ["무모함", "경솔함", "방황", "준비 부족"] },
    up: {
      love: "계산 없는 설렘이 찾아옵니다. 새로운 인연이 가볍고 즐겁게 시작될 수 있어요. 마음이 가는 대로 한 걸음 내디뎌 보세요.",
      career: "새로운 분야나 도전에 첫발을 딛기 좋은 때입니다. 경험이 부족해도 호기심과 열린 태도가 기회를 불러옵니다.",
      money: "새로운 수입원이나 재테크에 관심이 생깁니다. 시작은 좋지만, 작게 시험해 보는 자세가 필요해요.",
      advice: "완벽한 준비를 기다리지 마세요. 오늘은 가벼운 마음으로 낯선 길을 걸어보는 날입니다."
    },
    rev: {
      love: "충동적인 감정에 휩쓸리기 쉬워요. 상대의 진심을 확인하기 전에 너무 앞서 나가지 않도록 주의하세요.",
      career: "계획 없이 뛰어들면 시행착오가 커집니다. 방향을 정하지 못하고 흔들린다면 잠시 멈춰 목표를 정리하세요.",
      money: "충동구매와 즉흥적인 투자가 손실로 이어질 수 있어요. 지갑을 여는 순간 한 번 더 생각하세요.",
      advice: "자유와 무책임은 한 끗 차이입니다. 오늘은 발밑을 먼저 살피세요."
    }
  },
  {
    id: 1, numeral: "I", name: "마법사", en: "The Magician", symbol: "🪄",
    colors: ["#4a1f6e", "#160c33", "rgba(255, 200, 120, 0.45)"],
    keywords: { up: ["창조력", "의지", "재능", "실행력"], rev: ["속임수", "재능 낭비", "자신감 부족", "조작"] },
    up: {
      love: "당신의 매력이 빛나는 시기입니다. 먼저 다가가고 표현하면 원하는 관계를 만들어갈 수 있어요.",
      career: "가진 능력과 자원을 모두 활용할 수 있는 때입니다. 아이디어를 실행으로 옮기면 좋은 성과가 따라옵니다.",
      money: "능력을 수입으로 연결할 수 있는 흐름입니다. 부업이나 재능을 활용한 수익 기회에 주목하세요.",
      advice: "필요한 도구는 이미 당신 손에 있습니다. 생각만 하지 말고 오늘 바로 시작하세요."
    },
    rev: {
      love: "달콤한 말 뒤에 숨은 의도를 살펴야 해요. 혹은 당신이 진심을 감추고 있지는 않은지 돌아보세요.",
      career: "능력은 있지만 제대로 발휘되지 못하고 있어요. 산만함을 줄이고 하나에 집중할 필요가 있습니다.",
      money: "그럴듯한 투자 제안이나 사기에 주의하세요. 너무 좋은 조건은 일단 의심해 보는 것이 좋아요.",
      advice: "말보다 행동이 앞서야 할 때입니다. 스스로를 속이지 마세요."
    }
  },
  {
    id: 2, numeral: "II", name: "여사제", en: "The High Priestess", symbol: "🌙",
    colors: ["#1f2a6e", "#0b0a24", "rgba(170, 190, 255, 0.5)"],
    keywords: { up: ["직관", "지혜", "내면의 목소리", "신비"], rev: ["비밀", "감정 억압", "직관 무시", "혼란"] },
    up: {
      love: "조용히 깊어지는 감정이 있습니다. 서두르기보다 상대를 천천히 알아가며 마음의 소리에 귀 기울이세요.",
      career: "공부와 연구에 좋은 시기입니다. 겉으로 드러나지 않아도 내실을 다지면 결실이 있습니다.",
      money: "큰 움직임보다는 관망이 유리합니다. 정보를 모으고 직감이 확신으로 바뀔 때까지 기다리세요.",
      advice: "답은 이미 당신 안에 있습니다. 오늘은 소음을 줄이고 내면의 목소리를 들어보세요."
    },
    rev: {
      love: "말하지 않은 비밀이나 오해가 관계에 그림자를 드리웁니다. 감정을 억누르지 말고 솔직해지세요.",
      career: "남의 의견에 휘둘려 자신의 판단을 놓치고 있어요. 확실하지 않은 정보는 꼭 다시 확인하세요.",
      money: "숨겨진 비용이나 미처 파악하지 못한 조건이 있을 수 있어요. 계약서를 꼼꼼히 읽으세요.",
      advice: "애써 외면한 느낌이 있다면, 오늘은 그것을 마주할 차례입니다."
    }
  },
  {
    id: 3, numeral: "III", name: "여황제", en: "The Empress", symbol: "🌹",
    colors: ["#5a2160", "#1a0d2e", "rgba(255, 170, 200, 0.45)"],
    keywords: { up: ["풍요", "사랑", "모성", "아름다움"], rev: ["과잉", "의존", "정체", "자기 소홀"] },
    up: {
      love: "사랑이 무르익고 따뜻하게 보살핌받는 시기입니다. 연인과의 관계가 안정되고 풍성해져요.",
      career: "창의력이 꽃피고 노력의 결실이 보이기 시작합니다. 디자인, 예술, 돌봄 분야라면 특히 길합니다.",
      money: "재물이 넉넉히 들어오는 풍요로운 흐름입니다. 여유가 생기는 만큼 나눔도 복을 부릅니다.",
      advice: "스스로에게 다정해지세요. 맛있는 음식, 좋은 휴식이 오늘의 행운을 키웁니다."
    },
    rev: {
      love: "지나친 집착이나 과보호가 관계를 답답하게 만들 수 있어요. 서로에게 숨 쉴 공간을 주세요.",
      career: "의욕이 떨어지고 일이 정체되어 있어요. 무리하기보다는 에너지를 회복하는 것이 먼저입니다.",
      money: "기분에 따른 소비와 사치가 늘기 쉬워요. 만족을 물건에서만 찾고 있지 않은지 살펴보세요.",
      advice: "남을 챙기느라 나를 잊지 마세요. 오늘은 자신을 돌보는 날입니다."
    }
  },
  {
    id: 4, numeral: "IV", name: "황제", en: "The Emperor", symbol: "👑",
    colors: ["#6e2a1f", "#1f0d12", "rgba(255, 190, 110, 0.45)"],
    keywords: { up: ["권위", "안정", "책임감", "리더십"], rev: ["독단", "통제욕", "고집", "불안정"] },
    up: {
      love: "믿음직하고 안정적인 관계를 만들어갑니다. 책임감 있는 태도가 상대에게 신뢰를 줍니다.",
      career: "리더십을 발휘하고 인정받을 기회입니다. 체계적으로 계획을 세우면 승진이나 합격 운이 따릅니다.",
      money: "탄탄한 재정 관리로 기반을 다지는 시기입니다. 장기적이고 보수적인 계획이 유리해요.",
      advice: "원칙을 세우고 지키세요. 오늘은 단단한 태도가 당신을 지켜줍니다."
    },
    rev: {
      love: "상대를 통제하려 하거나 고집을 부리면 갈등이 생깁니다. 이기려 하기보다 이해하려 해보세요.",
      career: "권위적인 상사나 경직된 조직 문화에 지칠 수 있어요. 유연함을 잃지 않는 것이 중요합니다.",
      money: "계획이 흔들리고 재정 관리가 느슨해집니다. 무리한 지출이나 큰 결정은 미루세요.",
      advice: "모든 것을 통제할 수는 없습니다. 오늘은 조금 내려놓아도 괜찮아요."
    }
  },
  {
    id: 5, numeral: "V", name: "교황", en: "The Hierophant", symbol: "🔑",
    colors: ["#3b3170", "#120f2e", "rgba(240, 220, 160, 0.45)"],
    keywords: { up: ["전통", "가르침", "신뢰", "조언"], rev: ["고정관념", "반항", "형식주의", "독자 노선"] },
    up: {
      love: "진지하고 신뢰를 바탕으로 한 관계입니다. 소개팅이나 주변의 추천으로 좋은 인연을 만날 수 있어요.",
      career: "멘토나 선배의 조언이 큰 도움이 됩니다. 정석적인 방법과 공인된 자격이 힘을 발휘해요.",
      money: "안정적이고 검증된 방식의 재테크가 좋습니다. 전문가의 조언을 구해보세요.",
      advice: "믿을 만한 사람에게 조언을 구하세요. 오래된 지혜 속에 오늘의 답이 있습니다."
    },
    rev: {
      love: "가치관 차이나 주변의 반대가 부담이 될 수 있어요. 형식보다 두 사람의 진심에 집중하세요.",
      career: "기존 방식이 더 이상 맞지 않는다고 느낍니다. 틀을 벗어나 새로운 길을 고민할 시기예요.",
      money: "남들 따라 하는 투자는 위험합니다. 스스로 이해하지 못한 상품에는 손대지 마세요.",
      advice: "당연하다고 여긴 것을 한 번 의심해 보세요. 나만의 기준이 필요합니다."
    }
  },
  {
    id: 6, numeral: "VI", name: "연인", en: "The Lovers", symbol: "💞",
    colors: ["#6e1f4a", "#1f0b24", "rgba(255, 160, 200, 0.5)"],
    keywords: { up: ["사랑", "조화", "선택", "교감"], rev: ["불화", "유혹", "잘못된 선택", "가치관 충돌"] },
    up: {
      love: "강한 끌림과 깊은 교감이 있는 시기입니다. 연인과의 관계가 한 단계 깊어지거나 운명 같은 만남이 있어요.",
      career: "좋은 파트너나 팀과 협업하며 시너지를 냅니다. 중요한 선택 앞에서는 진짜 원하는 것을 따르세요.",
      money: "동업이나 공동 투자에 좋은 흐름입니다. 다만 선택의 기로라면 가치관에 맞는 쪽을 고르세요.",
      advice: "마음이 진정으로 원하는 쪽을 선택하세요. 오늘은 진심이 길을 엽니다."
    },
    rev: {
      love: "오해와 엇갈림이 생기기 쉬워요. 유혹이나 제3자의 개입에 흔들리지 않도록 마음을 지키세요.",
      career: "팀 내 의견 충돌이나 잘못된 선택에 대한 후회가 있을 수 있어요. 결정을 서두르지 마세요.",
      money: "감정적인 판단이 금전 손실로 이어질 수 있어요. 돈 문제로 가까운 사람과 다투지 않도록 주의하세요.",
      advice: "머리와 마음이 따로 놀고 있어요. 오늘은 자신에게 솔직해지는 연습이 필요합니다."
    }
  },
  {
    id: 7, numeral: "VII", name: "전차", en: "The Chariot", symbol: "🐎",
    colors: ["#1f3a6e", "#0b1024", "rgba(150, 200, 255, 0.45)"],
    keywords: { up: ["승리", "추진력", "의지", "전진"], rev: ["방향 상실", "조급함", "통제 불능", "좌절"] },
    up: {
      love: "적극적으로 다가가면 원하는 사람의 마음을 얻을 수 있어요. 망설임 없이 마음을 표현하세요.",
      career: "강한 추진력으로 목표를 향해 돌진합니다. 시험, 면접, 경쟁에서 승리할 가능성이 높아요.",
      money: "목표를 향한 꾸준한 노력이 수익으로 이어집니다. 명확한 목표 금액을 세우면 더 빨라져요.",
      advice: "고삐를 단단히 쥐세요. 오늘은 망설임보다 결단이 승리를 부릅니다."
    },
    rev: {
      love: "혼자 앞서 나가며 상대의 속도를 무시하고 있진 않나요? 관계의 방향을 함께 맞춰보세요.",
      career: "의욕만 앞서고 방향을 잃기 쉬워요. 여러 일을 벌이기보다 우선순위를 정리하세요.",
      money: "조급한 마음에 무리한 결정을 내리기 쉬워요. 속도를 줄이고 계획을 다시 점검하세요.",
      advice: "빨리 가는 것보다 바르게 가는 것이 중요합니다. 오늘은 잠시 숨을 고르세요."
    }
  },
  {
    id: 8, numeral: "VIII", name: "힘", en: "Strength", symbol: "🦁",
    colors: ["#6e4a1f", "#24140b", "rgba(255, 200, 120, 0.5)"],
    keywords: { up: ["용기", "인내", "부드러운 힘", "자기 통제"], rev: ["자신감 상실", "나약함", "감정 폭발", "의심"] },
    up: {
      love: "부드러운 배려와 인내가 관계를 단단하게 만듭니다. 상대의 서툰 모습도 너그럽게 감싸 안아주세요.",
      career: "어려운 상황도 끈기와 차분함으로 이겨낼 수 있어요. 꾸준함이 결국 인정받습니다.",
      money: "충동을 다스리는 힘이 재물을 지킵니다. 꾸준히 모으는 습관이 큰 힘이 됩니다.",
      advice: "진짜 강함은 부드러움에서 나옵니다. 오늘은 화를 다스리고 미소로 대응하세요."
    },
    rev: {
      love: "자신감이 떨어져 관계에서 위축되거나, 반대로 감정이 폭발할 수 있어요. 마음의 균형을 찾으세요.",
      career: "스스로를 의심하며 실력을 발휘하지 못하고 있어요. 작은 성공 경험부터 다시 쌓아가세요.",
      money: "스트레스성 소비가 늘 수 있어요. 감정이 흔들릴 때는 결제를 미루는 습관을 들이세요.",
      advice: "당신은 생각보다 강합니다. 오늘은 자신을 믿어주는 것부터 시작하세요."
    }
  },
  {
    id: 9, numeral: "IX", name: "은둔자", en: "The Hermit", symbol: "🏮",
    colors: ["#2a2f5a", "#0b0c1f", "rgba(255, 220, 150, 0.45)"],
    keywords: { up: ["성찰", "고독", "탐구", "내면의 빛"], rev: ["고립", "외로움", "회피", "단절"] },
    up: {
      love: "혼자만의 시간을 통해 진정 원하는 사랑이 무엇인지 깨닫게 됩니다. 서두르지 않아도 괜찮아요.",
      career: "깊이 있는 공부와 전문성을 쌓기 좋은 시기입니다. 혼자 집중할 때 실력이 크게 늡니다.",
      money: "소비를 줄이고 내실을 다지는 시기입니다. 지출 내역을 차분히 정리해 보세요.",
      advice: "잠시 세상과 거리를 두고 등불을 켜세요. 고요함 속에서 길이 보입니다."
    },
    rev: {
      love: "마음의 문을 닫고 혼자 고립되어 있어요. 외로움을 인정하고 먼저 손을 내밀어 보세요.",
      career: "혼자 고민하느라 시간이 지체되고 있어요. 주변에 도움을 청하면 의외로 쉽게 풀립니다.",
      money: "현실을 외면하면 문제가 커집니다. 미뤄둔 금전 문제를 지금 들여다보세요.",
      advice: "혼자 견디는 것만이 답은 아닙니다. 오늘은 누군가에게 안부를 전해보세요."
    }
  },
  {
    id: 10, numeral: "X", name: "운명의 수레바퀴", en: "Wheel of Fortune", symbol: "☸️",
    colors: ["#4a3a8e", "#140f33", "rgba(200, 170, 255, 0.5)"],
    keywords: { up: ["행운", "전환점", "운명", "기회"], rev: ["불운", "정체", "흐름의 역행", "저항"] },
    up: {
      love: "운명 같은 만남이나 관계의 전환점이 찾아옵니다. 우연처럼 보이는 일에 의미가 있어요.",
      career: "예상치 못한 기회와 행운이 찾아옵니다. 변화의 흐름에 올라타면 크게 도약할 수 있어요.",
      money: "금전운이 상승하는 흐름입니다. 뜻밖의 수입이나 좋은 기회가 생길 수 있어요.",
      advice: "운이 당신 편으로 돌고 있습니다. 오늘 찾아오는 기회를 놓치지 마세요."
    },
    rev: {
      love: "타이밍이 자꾸 엇갈립니다. 억지로 바꾸려 하기보다 흐름이 바뀔 때를 기다리세요.",
      career: "일이 뜻대로 풀리지 않는 시기입니다. 지금은 내려가는 바퀴일 뿐, 곧 다시 올라옵니다.",
      money: "예상치 못한 지출이 생길 수 있어요. 비상금을 확보하고 큰 투자는 피하세요.",
      advice: "모든 흐름은 순환합니다. 오늘의 불운에 너무 마음 쓰지 마세요."
    }
  },
  {
    id: 11, numeral: "XI", name: "정의", en: "Justice", symbol: "⚖️",
    colors: ["#1f4a5a", "#0b1a24", "rgba(170, 230, 255, 0.45)"],
    keywords: { up: ["공정", "균형", "진실", "책임"], rev: ["불공정", "편견", "책임 회피", "불균형"] },
    up: {
      love: "서로 주고받는 마음의 균형이 맞는 관계입니다. 솔직하고 공정한 대화가 관계를 건강하게 합니다.",
      career: "노력한 만큼 정당한 평가를 받습니다. 계약, 시험, 법적 문제에서 좋은 결과가 기대돼요.",
      money: "들어오고 나가는 돈의 균형이 잡힙니다. 정당한 대가를 받고 합리적으로 쓰세요.",
      advice: "뿌린 대로 거둡니다. 오늘은 정직함이 가장 확실한 행운입니다."
    },
    rev: {
      love: "한쪽만 희생하는 불균형한 관계일 수 있어요. 서운함을 쌓아두지 말고 공정하게 이야기하세요.",
      career: "부당한 평가나 불리한 조건에 놓일 수 있어요. 기록과 증거를 꼼꼼히 남겨두세요.",
      money: "계약이나 금전 거래에서 불리한 조건이 숨어 있을 수 있어요. 서명 전 반드시 확인하세요.",
      advice: "핑계보다 책임을 선택하세요. 오늘은 스스로에게 정직해지는 날입니다."
    }
  },
  {
    id: 12, numeral: "XII", name: "매달린 사람", en: "The Hanged Man", symbol: "🙃",
    colors: ["#1f5a4a", "#0b1f1a", "rgba(150, 255, 210, 0.4)"],
    keywords: { up: ["관점 전환", "인내", "희생", "기다림"], rev: ["헛된 희생", "지연", "정체", "고집"] },
    up: {
      love: "관계가 잠시 멈춘 듯 보이지만, 상대의 입장에서 생각해 보면 새로운 이해가 생깁니다.",
      career: "당장 진전이 없어도 이 기다림은 의미가 있습니다. 다른 관점에서 문제를 바라보면 해답이 보여요.",
      money: "지금은 돈을 굴리기보다 묶어두는 시기입니다. 단기 이익보다 장기적 안목이 필요해요.",
      advice: "거꾸로 보면 다르게 보입니다. 오늘은 익숙한 생각을 뒤집어 보세요."
    },
    rev: {
      love: "보답 없는 희생을 계속하고 있진 않나요? 나를 잃어가는 관계라면 다시 생각해 볼 때입니다.",
      career: "의미 없는 기다림에 지쳐 있어요. 상황이 바뀌지 않는다면 이제 행동으로 옮길 때입니다.",
      money: "자금이 묶이거나 지급이 지연될 수 있어요. 유동성을 확보해 두세요.",
      advice: "버티는 것만이 미덕은 아닙니다. 오늘은 멈춘 것을 다시 움직여 보세요."
    }
  },
  {
    id: 13, numeral: "XIII", name: "죽음", en: "Death", symbol: "🥀",
    colors: ["#2a1f3a", "#0b0812", "rgba(200, 160, 220, 0.4)"],
    keywords: { up: ["끝과 시작", "변화", "정리", "재탄생"], rev: ["변화 거부", "미련", "정체", "질질 끌기"] },
    up: {
      love: "한 시기의 관계가 끝나고 새로운 국면이 열립니다. 이별이든 변화든, 더 나은 시작을 위한 과정이에요.",
      career: "기존의 일이나 방식을 정리하고 새 출발을 할 시기입니다. 끝은 곧 새로운 문입니다.",
      money: "낡은 소비 습관이나 손실 나는 투자를 정리하기 좋은 때입니다. 과감한 정리가 새 흐름을 만듭니다.",
      advice: "놓아야 새로운 것이 들어옵니다. 오늘은 하나를 깔끔하게 끝내보세요."
    },
    rev: {
      love: "이미 끝난 관계에 미련을 두고 있진 않나요? 과거를 붙잡을수록 새로운 인연이 멀어집니다.",
      career: "변화가 두려워 현재에 머물러 있어요. 맞지 않는 자리라면 용기를 내 정리할 필요가 있습니다.",
      money: "손실을 인정하지 못하고 버티면 더 커질 수 있어요. 손절의 타이밍을 고민하세요.",
      advice: "변화를 피할수록 더 오래 아픕니다. 오늘은 작은 변화부터 받아들이세요."
    }
  },
  {
    id: 14, numeral: "XIV", name: "절제", en: "Temperance", symbol: "🏺",
    colors: ["#1f4a6e", "#0b1428", "rgba(170, 220, 255, 0.45)"],
    keywords: { up: ["조화", "균형", "절제", "치유"], rev: ["불균형", "과잉", "조급함", "부조화"] },
    up: {
      love: "서로의 다름을 조화롭게 맞춰가는 편안한 관계입니다. 천천히, 꾸준히 신뢰가 쌓여요.",
      career: "협력과 조율이 빛을 발합니다. 균형 잡힌 태도로 일하면 주변의 신뢰를 얻어요.",
      money: "수입과 지출의 균형이 안정적입니다. 무리하지 않는 꾸준한 저축이 최선이에요.",
      advice: "지나침도 모자람도 없이. 오늘은 적당함이 가장 큰 미덕입니다."
    },
    rev: {
      love: "감정의 온도 차이가 커서 삐걱거릴 수 있어요. 한쪽으로 치우치지 않도록 대화로 조율하세요.",
      career: "일과 휴식의 균형이 무너졌어요. 번아웃이 오기 전에 속도를 조절하세요.",
      money: "과소비나 극단적인 절약 모두 탈이 납니다. 균형 잡힌 예산을 다시 세워보세요.",
      advice: "무엇이든 과하면 독이 됩니다. 오늘은 한 박자 쉬어가세요."
    }
  },
  {
    id: 15, numeral: "XV", name: "악마", en: "The Devil", symbol: "😈",
    colors: ["#5a1f1f", "#1a0808", "rgba(255, 120, 120, 0.45)"],
    keywords: { up: ["유혹", "집착", "욕망", "속박"], rev: ["해방", "속박에서 벗어남", "각성", "회복"] },
    up: {
      love: "강렬한 끌림이 있지만 집착이나 소유욕으로 번질 수 있어요. 건강한 관계인지 돌아보세요.",
      career: "돈이나 조건에 묶여 원치 않는 일을 하고 있진 않나요? 나쁜 습관이나 유혹을 경계하세요.",
      money: "물욕과 유혹이 강해지는 시기입니다. 도박성 투자나 과도한 대출은 피하세요.",
      advice: "당신을 묶고 있는 사슬은 생각보다 느슨합니다. 오늘은 유혹 하나를 거절해 보세요."
    },
    rev: {
      love: "집착하던 관계나 감정에서 벗어나 자유로워집니다. 나를 힘들게 하던 인연을 정리할 용기가 생겨요.",
      career: "나쁜 습관이나 억압적인 환경에서 벗어날 기회입니다. 스스로를 해방시키세요.",
      money: "빚이나 나쁜 소비 습관에서 벗어나기 시작합니다. 지금의 결심을 꾸준히 이어가세요.",
      advice: "벗어날 수 있다는 걸 이제 알았습니다. 오늘은 그 첫걸음을 내디디세요."
    }
  },
  {
    id: 16, numeral: "XVI", name: "탑", en: "The Tower", symbol: "⚡",
    colors: ["#3a1f5a", "#0d0820", "rgba(255, 230, 120, 0.5)"],
    keywords: { up: ["급변", "붕괴", "충격", "깨달음"], rev: ["위기 모면", "변화 회피", "내적 혼란", "지연된 붕괴"] },
    up: {
      love: "갑작스러운 사건이 관계를 뒤흔듭니다. 아프지만 거짓 위에 세운 것은 무너지고 진실이 드러나요.",
      career: "예상치 못한 변화나 계획의 붕괴가 있을 수 있어요. 무너진 자리에서 더 단단한 것을 세울 수 있습니다.",
      money: "갑작스러운 지출이나 손실에 대비하세요. 위험 자산은 미리 점검해 두는 것이 좋아요.",
      advice: "흔들림은 새로 짓기 위한 신호입니다. 오늘은 예상 밖의 일에 유연하게 대처하세요."
    },
    rev: {
      love: "곪아 있는 문제를 외면하고 있진 않나요? 작은 갈등일 때 마주하는 것이 큰 폭풍을 막습니다.",
      career: "위기를 아슬아슬하게 넘기지만 근본 문제는 남아 있어요. 미리 구조를 손보세요.",
      money: "큰 손실은 피하지만 불안 요소가 남아 있어요. 재정 상태를 냉정하게 점검하세요.",
      advice: "무너질 것은 결국 무너집니다. 오늘은 미루던 문제를 직시하세요."
    }
  },
  {
    id: 17, numeral: "XVII", name: "별", en: "The Star", symbol: "⭐",
    colors: ["#1f3a7a", "#0a0f2e", "rgba(190, 220, 255, 0.55)"],
    keywords: { up: ["희망", "치유", "영감", "평온"], rev: ["실망", "비관", "자신감 상실", "막연함"] },
    up: {
      love: "상처가 치유되고 순수한 희망이 피어납니다. 이상형에 가까운 사람을 만나거나 관계가 맑아져요.",
      career: "꿈과 목표가 선명해지고 영감이 샘솟습니다. 오래 바라던 일이 이루어질 조짐이 보여요.",
      money: "점차 회복되고 나아지는 흐름입니다. 장기적인 꿈을 위한 저축을 시작하기 좋아요.",
      advice: "밤이 깊을수록 별은 밝게 빛납니다. 오늘은 희망을 품고 하늘을 올려다보세요."
    },
    rev: {
      love: "기대가 컸던 만큼 실망도 커질 수 있어요. 현실적인 시선으로 관계를 바라보세요.",
      career: "목표가 멀게만 느껴지고 의욕이 떨어집니다. 작고 구체적인 목표로 다시 시작해 보세요.",
      money: "막연한 기대에 기대지 마세요. 구체적인 계획 없이 행운만 바라면 실망하게 됩니다.",
      advice: "희망은 사라진 게 아니라 잠시 구름에 가려졌을 뿐입니다."
    }
  },
  {
    id: 18, numeral: "XVIII", name: "달", en: "The Moon", symbol: "🌕",
    colors: ["#2a2a6e", "#0b0b24", "rgba(220, 220, 255, 0.5)"],
    keywords: { up: ["불안", "환상", "무의식", "모호함"], rev: ["진실 드러남", "불안 해소", "혼란 정리", "명확해짐"] },
    up: {
      love: "상대의 마음이 잘 보이지 않아 불안합니다. 상상으로 오해를 키우지 말고 확인하세요.",
      career: "상황이 불분명하고 정보가 부족해요. 확실해질 때까지 중요한 결정은 미루는 것이 좋습니다.",
      money: "불확실한 정보나 소문에 휘둘리기 쉬워요. 출처가 불분명한 투자는 피하세요.",
      advice: "어둠 속에서는 모든 것이 실제보다 커 보입니다. 오늘은 불안을 사실과 구분하세요."
    },
    rev: {
      love: "오해가 풀리고 숨겨졌던 진실이 드러납니다. 관계를 둘러싼 안개가 걷히기 시작해요.",
      career: "혼란스러웠던 상황이 정리되고 방향이 보이기 시작합니다. 직감을 믿어도 좋아요.",
      money: "숨겨진 문제를 발견하고 바로잡을 수 있어요. 불안했던 금전 문제가 서서히 해결됩니다.",
      advice: "안개는 걷히고 있습니다. 오늘은 마음이 조금 가벼워질 거예요."
    }
  },
  {
    id: 19, numeral: "XIX", name: "태양", en: "The Sun", symbol: "☀️",
    colors: ["#7a4a1f", "#2a140b", "rgba(255, 220, 120, 0.6)"],
    keywords: { up: ["성공", "기쁨", "활력", "긍정"], rev: ["일시적 침체", "과신", "지연된 성공", "기운 저하"] },
    up: {
      love: "밝고 행복한 사랑의 에너지가 가득합니다. 솔직한 마음 표현이 좋은 결과로 이어져요.",
      career: "노력이 빛을 보고 성공을 거둡니다. 합격, 승진, 성과 등 기쁜 소식이 기대돼요.",
      money: "금전운이 최고조에 달합니다. 수입이 늘고 재정적으로 여유로워지는 시기예요.",
      advice: "당신은 빛날 자격이 있습니다. 오늘은 마음껏 웃고 즐기세요."
    },
    rev: {
      love: "좋은 관계지만 작은 오해로 기운이 가라앉을 수 있어요. 긍정적인 시선을 잃지 마세요.",
      career: "성공이 조금 늦어질 뿐 방향은 맞습니다. 자만하지 말고 마무리를 꼼꼼히 하세요.",
      money: "기대보다 수익이 적을 수 있어요. 낙관만 하지 말고 현실적인 계획을 함께 세우세요.",
      advice: "구름 뒤에도 태양은 있습니다. 오늘은 작은 기쁨부터 찾아보세요."
    }
  },
  {
    id: 20, numeral: "XX", name: "심판", en: "Judgement", symbol: "📯",
    colors: ["#4a2a6e", "#140b24", "rgba(255, 210, 170, 0.5)"],
    keywords: { up: ["부활", "각성", "결단", "새로운 부름"], rev: ["자기 의심", "후회", "결정 회피", "과거에 갇힘"] },
    up: {
      love: "과거 인연과 재회하거나 관계가 새롭게 거듭납니다. 지난 일을 용서하면 새 장이 열려요.",
      career: "그동안의 노력이 평가받고 새로운 기회의 부름이 옵니다. 중요한 결단을 내리기 좋은 때예요.",
      money: "지난 노력의 보상이 돌아옵니다. 묵혀둔 자금이나 미수금이 회수될 수 있어요.",
      advice: "마음속 부름에 응답하세요. 오늘은 새로운 나로 깨어나는 날입니다."
    },
    rev: {
      love: "과거의 상처나 후회에 갇혀 있어요. 자신을 너무 가혹하게 판단하지 마세요.",
      career: "결정을 미루다 기회를 놓칠 수 있어요. 완벽한 답보다 지금의 결단이 중요합니다.",
      money: "과거의 금전 실수를 반복할 위험이 있어요. 같은 패턴을 반복하고 있진 않은지 살펴보세요.",
      advice: "과거는 판결이 아니라 교훈입니다. 오늘은 자신을 용서해 주세요."
    }
  },
  {
    id: 21, numeral: "XXI", name: "세계", en: "The World", symbol: "🌍",
    colors: ["#1f5a5a", "#0b1f24", "rgba(170, 255, 230, 0.45)"],
    keywords: { up: ["완성", "성취", "통합", "여행"], rev: ["미완성", "마무리 부족", "지연", "아쉬움"] },
    up: {
      love: "관계가 완성의 단계에 이릅니다. 결혼이나 깊은 약속 등 아름다운 결실이 기대돼요.",
      career: "목표를 이루고 한 사이클을 성공적으로 마무리합니다. 해외나 넓은 무대로의 기회도 있어요.",
      money: "재정적인 목표를 달성하고 안정을 누립니다. 노력의 결실을 충분히 즐기세요.",
      advice: "당신은 한 여정의 끝에 서 있습니다. 오늘은 스스로를 축하해 주세요."
    },
    rev: {
      love: "마지막 한 걸음이 부족해 관계가 제자리예요. 미뤄둔 대화나 약속을 매듭지어 보세요.",
      career: "거의 다 왔지만 마무리가 늦어지고 있어요. 끝까지 집중력을 잃지 마세요.",
      money: "목표 달성이 조금 늦어집니다. 남은 과제를 점검하고 서두르지 말고 마무리하세요.",
      advice: "완성은 가까이 있습니다. 오늘은 미완성의 조각 하나를 채워보세요."
    }
  }
];


/* ---------- 2. 설정 & 상수 ---------- */
const GEMINI_MODEL = "gemini-2.5-flash";
const GEMINI_URL =
  `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:streamGenerateContent?alt=sse`;
const STORAGE_KEY = "midnightTarot.geminiApiKey";

const POSITIONS = [
  { label: "과거", en: "PAST",    intro: "지나온 시간 속의" },
  { label: "현재", en: "PRESENT", intro: "지금 이 순간의" },
  { label: "미래", en: "FUTURE",  intro: "다가올 날들의" }
];

// 데모 모드: 고민 내용에서 주제를 추정해 내장 해석 중 알맞은 항목을 고른다
const TOPICS = {
  love: {
    words: ["연애", "사랑", "썸", "남친", "여친", "남자친구", "여자친구", "고백", "이별", "재회", "결혼", "짝사랑", "연인", "애인", "소개팅", "그 사람", "좋아하는"],
    label: "사랑",
    tip: "마음을 짐작만 하지 말고, 부담 없는 대화로 상대의 속도를 확인해 보세요."
  },
  career: {
    words: ["면접", "취업", "취직", "합격", "시험", "이직", "퇴사", "회사", "직장", "공부", "진로", "학업", "승진", "자격증", "수능", "입시", "알바", "프로젝트", "커리어"],
    label: "일과 배움",
    tip: "준비할 수 있는 것(자료 정리, 예상 질문 연습 등)을 오늘 하나만 확실히 끝내보세요."
  },
  money: {
    words: ["돈", "금전", "재물", "투자", "주식", "코인", "월급", "저축", "목돈", "빚", "대출", "재테크", "부동산", "수입", "사업", "매출"],
    label: "재물",
    tip: "이번 주 지출을 기록해 보면 새는 돈과 모을 수 있는 돈이 함께 보일 거예요."
  },
  advice: {
    words: [],
    label: "삶의 흐름",
    tip: "오늘 밤은 충분히 쉬고, 내일 아침 가장 먼저 떠오르는 마음을 믿어보세요."
  }
};

const SYSTEM_PROMPT = [
  "당신은 20년 경력의 따뜻하고 지혜로운 타로 마스터입니다.",
  "상담자의 고민에 깊이 공감하며, 부드럽고 다정한 존댓말로 이야기합니다.",
  "겁을 주거나 단정적인 예언을 하지 않고, 카드의 상징을 근거로 희망과 현실적인 방향을 함께 제시합니다.",
  "역방향 카드는 '나쁜 카드'가 아니라 막힌 에너지나 돌아봐야 할 점으로 해석합니다.",
  "의료·법률·투자에 대해서는 확정적인 판단을 내리지 않습니다."
].join(" ");

/* ---------- 3. 상태 ---------- */
const state = {
  concern: "",
  deck: [],          // { card, reversed }
  picked: [],        // deck 인덱스
  session: 0,        // '다시 뽑기' 시 진행 중인 작업을 무효화하기 위한 번호
  controller: null,  // fetch 중단용
  typer: null,
  timers: []
};

/* ---------- 4. DOM ---------- */
const $ = (sel) => document.querySelector(sel);
const screens = { ask: $("#screen-ask"), pick: $("#screen-pick"), result: $("#screen-result") };

const concernEl = $("#concern");
const concernCountEl = $("#concern-count");
const btnSpread = $("#btn-spread");
const deckEl = $("#deck");
const slotEls = document.querySelectorAll(".slot");
const pickCountEl = $("#pick-count");
const btnConfirm = $("#btn-confirm");
const spreadEl = $("#spread");
const readingEl = $("#reading");
const readingBodyEl = $("#reading-body");
const readingNoticeEl = $("#reading-notice");
const readingModeEl = $("#reading-mode");
const btnSkip = $("#btn-skip");
const btnReset = $("#btn-reset");

const modeChipEl = $("#mode-chip");
const settingsDialog = $("#settings");
const settingsForm = $("#settings-form");
const apiKeyInput = $("#api-key");

/* ---------- 5. 유틸 ---------- */
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function later(fn, ms) {
  const id = setTimeout(fn, ms);
  state.timers.push(id);
  return id;
}

function showScreen(name) {
  Object.entries(screens).forEach(([key, node]) => node.classList.toggle("is-active", key === name));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// 한국어 조사: 받침 유무에 따라 이/가, 은/는 등 선택
function josa(word, withBatchim, withoutBatchim) {
  const code = word.charCodeAt(word.length - 1) - 0xac00;
  const has = code >= 0 && code <= 11171 && code % 28 !== 0;
  return word + (has ? withBatchim : withoutBatchim);
}

const orientText = (reversed) => (reversed ? "역방향" : "정방향");
const pickedCards = () => state.picked.map((i) => state.deck[i]);

/* ---------- 6. API 키 저장 (localStorage) ---------- */
let memoryKey = ""; // localStorage를 쓸 수 없는 환경 대비

function getApiKey() {
  try { return localStorage.getItem(STORAGE_KEY) || ""; } catch { return memoryKey; }
}

function setApiKey(value) {
  memoryKey = value;
  try {
    if (value) localStorage.setItem(STORAGE_KEY, value);
    else localStorage.removeItem(STORAGE_KEY);
  } catch { /* 저장 불가 시 메모리에만 유지 */ }
  updateModeChip();
}

function updateModeChip() {
  const live = Boolean(getApiKey());
  modeChipEl.textContent = live ? "✦ Gemini 연결됨" : "데모 모드";
  modeChipEl.classList.toggle("live", live);
}

$("#btn-settings").addEventListener("click", () => {
  apiKeyInput.value = getApiKey();
  apiKeyInput.type = "password";
  settingsDialog.showModal();
  apiKeyInput.focus();
});

settingsForm.addEventListener("submit", () => {
  setApiKey(apiKeyInput.value.trim()); // method="dialog"라서 저장 후 자동으로 닫힘
});

$("#btn-clear-key").addEventListener("click", () => {
  apiKeyInput.value = "";
  setApiKey("");
  apiKeyInput.focus();
});

$("#btn-toggle-key").addEventListener("click", () => {
  apiKeyInput.type = apiKeyInput.type === "password" ? "text" : "password";
});

$("#btn-close-settings").addEventListener("click", () => settingsDialog.close());

settingsDialog.addEventListener("click", (e) => {
  if (e.target === settingsDialog) settingsDialog.close(); // 바깥 영역 클릭 시 닫기
});

/* ---------- 7. 밤하늘 별 ---------- */
function createStars() {
  const container = $("#stars");
  const count = window.innerWidth < 600 ? 70 : 140;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const s = el("span", "star" + (Math.random() < 0.12 ? " gold" : ""));
    const size = Math.random() * 2.2 + 0.6;
    s.style.width = s.style.height = size + "px";
    s.style.left = Math.random() * 100 + "%";
    s.style.top = Math.random() * 100 + "%";
    s.style.setProperty("--dur", (Math.random() * 4 + 2.5).toFixed(2) + "s");
    s.style.setProperty("--delay", (Math.random() * 5).toFixed(2) + "s");
    frag.appendChild(s);
  }
  container.appendChild(frag);
}

/* ---------- 8. STEP 1: 고민 입력 ---------- */
function syncConcern() {
  const len = concernEl.value.length;
  concernCountEl.textContent = String(len);
  btnSpread.disabled = concernEl.value.trim().length < 2;
}

concernEl.addEventListener("input", syncConcern);
concernEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && (e.ctrlKey || e.metaKey) && !btnSpread.disabled) startPick();
});

document.querySelectorAll(".examples .chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    concernEl.value = chip.textContent.trim();
    syncConcern();
    concernEl.focus();
  });
});

btnSpread.addEventListener("click", startPick);

/* ---------- 9. STEP 2: 카드 펼치기 & 선택 ---------- */
function startPick() {
  state.concern = concernEl.value.trim();
  if (state.concern.length < 2) return;

  // 22장을 섞고, 각 카드의 정/역방향을 50% 확률로 정해둔다 (공개 시점에 드러남)
  state.deck = shuffleArray(TAROT_CARDS).map((card) => ({ card, reversed: Math.random() < 0.5 }));
  state.picked = [];

  $("#pick-concern").textContent = `“${state.concern}”`;
  pickCountEl.textContent = "0";
  btnConfirm.disabled = true;
  btnConfirm.classList.remove("ready");
  slotEls.forEach((slot) => {
    slot.classList.remove("filled");
    slot.querySelector(".slot-card").innerHTML = "";
  });

  showScreen("pick");
  renderDeck();
}

function renderDeck() {
  deckEl.innerHTML = "";
  deckEl.classList.remove("locked");
  const total = state.deck.length;
  const spreadAngle = 100; // 부채꼴 전체 각도 (데스크톱)

  const cards = state.deck.map((_, index) => {
    const btn = el("button", "deck-card");
    btn.type = "button";
    btn.setAttribute("aria-label", `${index + 1}번째 카드 고르기`);
    btn.style.setProperty("--angle", "0deg");
    btn.style.setProperty("--delay", (index * 0.03).toFixed(2) + "s");
    btn.dataset.angle = (-spreadAngle / 2 + (spreadAngle / (total - 1)) * index).toFixed(2);
    btn.appendChild(el("div", "card-back"));
    btn.addEventListener("click", () => pickCard(index, btn));
    deckEl.appendChild(btn);
    return btn;
  });

  // 한 덩어리로 겹쳐 있다가 다음 프레임에 부채꼴로 촤르륵 펼쳐짐
  requestAnimationFrame(() =>
    requestAnimationFrame(() =>
      cards.forEach((btn) => btn.style.setProperty("--angle", btn.dataset.angle + "deg"))
    )
  );
}

function pickCard(index, btn) {
  if (state.picked.length >= 3 || state.picked.includes(index)) return;

  state.picked.push(index);
  const slot = slotEls[state.picked.length - 1];
  const session = state.session;

  btn.classList.add("lifting"); // 위로 살짝 떠오름
  pickCountEl.textContent = String(state.picked.length);

  later(() => {
    if (session !== state.session) return;
    btn.classList.add("taken");
    slot.classList.add("filled");
    slot.querySelector(".slot-card").appendChild(el("div", "card-back"));
  }, 380);

  if (state.picked.length === 3) {
    deckEl.classList.add("locked");
    btnConfirm.disabled = false;
    btnConfirm.classList.add("ready");
    preloadCardImages(pickedCards());
  }
}

btnConfirm.addEventListener("click", startReveal);

/* ---------- 10. STEP 3: 카드 뒤집기 ---------- */
function startReveal() {
  if (state.picked.length !== 3) return;
  const session = state.session;

  $("#result-concern").textContent = `“${state.concern}”`;
  spreadEl.innerHTML = "";
  readingEl.hidden = true;
  readingNoticeEl.hidden = true;
  readingBodyEl.innerHTML = "";
  btnSkip.hidden = true;

  const cardEls = pickedCards().map(({ card, reversed }, pos) => {
    const item = el("div", "spread-item");
    const cardEl = buildTarotCard(card, reversed, pos);
    item.appendChild(el("span", "position-label", POSITIONS[pos].label));
    item.appendChild(cardEl);
    item.appendChild(el("span", `card-orient ${reversed ? "rev" : "up"}`, reversed ? "역방향 ↓" : "정방향 ↑"));
    item.appendChild(el("span", "card-cname", card.name));
    spreadEl.appendChild(item);
    return cardEl;
  });

  showScreen("result");

  // 카드가 뒤집히는 동안 미리 리딩 요청을 시작해 대기 시간을 줄인다
  const live = Boolean(getApiKey());
  readingModeEl.textContent = live ? `✦ ${GEMINI_MODEL}` : "데모 해석";
  readingModeEl.classList.toggle("live", live);
  state.typer = new Typewriter(readingBodyEl, () => { btnSkip.hidden = true; });
  produceReading(session, state.typer);

  // 순차 3D 플립
  const FIRST = 700, GAP = 800, FLIP_MS = 1000;
  cardEls.forEach((cardEl, i) => {
    later(() => {
      cardEl.classList.add("flipped");
      cardEl.setAttribute("aria-label", `${POSITIONS[i].label} 카드 공개됨`);
    }, FIRST + GAP * i);
  });

  // 마지막 카드가 다 뒤집힌 뒤 리딩 타이핑 시작
  later(() => {
    if (session !== state.session) return;
    readingEl.hidden = false;
    btnSkip.hidden = false;
    state.typer.start();
    readingEl.scrollIntoView({ behavior: "smooth", block: "start" });
  }, FIRST + GAP * (cardEls.length - 1) + FLIP_MS + 200);
}

function buildTarotCard(card, reversed, pos) {
  const wrap = el("div", "tarot-card" + (reversed ? " reversed" : ""));
  wrap.style.setProperty("--delay", (pos * 0.15).toFixed(2) + "s");
  wrap.setAttribute("role", "img");
  wrap.setAttribute("aria-label", `${POSITIONS[pos].label} 카드`);

  const inner = el("div", "card-inner");
  const back = el("div", "card-face card-back");
  const front = el("div", "card-face card-front");

  const [c1, c2, glow] = card.colors;
  front.style.setProperty("--c1", c1);
  front.style.setProperty("--c2", c2);
  front.style.setProperty("--glow", glow);

  // 실제 카드 이미지 (cards/m00.jpg ~ m21.jpg)
  front.classList.add("has-image");
  const img = el("img", "front-image");
  img.src = cardImagePath(card);
  img.alt = `${card.numeral}. ${card.name} (${card.en})${reversed ? " — 역방향" : ""}`;
  img.decoding = "async";
  img.draggable = false;
  // 이미지를 못 불러오면 CSS 일러스트로 대체
  img.addEventListener("error", () => {
    img.remove();
    front.classList.remove("has-image");
    front.appendChild(buildFrontIllustration(card));
  }, { once: true });

  front.appendChild(img);
  inner.append(back, front);
  wrap.appendChild(inner);
  return wrap;
}

function cardImagePath(card) {
  return `cards/m${String(card.id).padStart(2, "0")}.jpg`;
}

// 뒤집기 전에 이미지를 미리 받아두어 플립 순간 빈 화면이 보이지 않게
function preloadCardImages(cards) {
  cards.forEach(({ card }) => { new Image().src = cardImagePath(card); });
}

// 이미지가 없을 때 쓰는 CSS/이모지 앞면 (예비용)
function buildFrontIllustration(card) {
  const frame = el("div", "front-frame");
  ["tl", "tr", "bl", "br"].forEach((p) => frame.appendChild(el("span", `corner ${p}`, "✦")));
  frame.appendChild(el("div", "front-numeral", card.numeral));
  const art = el("div", "front-art");
  art.appendChild(el("span", "front-symbol", card.symbol));
  frame.appendChild(art);
  const name = el("div", "front-name");
  name.appendChild(el("span", "ko", card.name));
  name.appendChild(el("span", "en", card.en));
  frame.appendChild(name);
  return frame;
}

/* ---------- 11. STEP 4: 리딩 (Gemini 스트리밍 / 데모) ---------- */
async function produceReading(session, typer) {
  const key = getApiKey();
  if (!key) {
    typer.push(buildDemoReading());
    typer.end();
    return;
  }

  state.controller = new AbortController();
  let received = false;
  try {
    await streamGemini(key, buildPrompt(), state.controller.signal, (text) => {
      if (session !== state.session) return;
      received = true;
      typer.push(text);
    });
    if (session !== state.session) return;
    if (!received) throw new Error("응답이 비어 있어요");
    typer.end();
  } catch (err) {
    if (err.name === "AbortError" || session !== state.session) return;
    console.error(err);
    if (received) {
      typer.push("\n\n_(연결이 끊겨 리딩이 중간에 멈췄어요. 다시 뽑기로 한 번 더 시도해 주세요.)_");
    } else {
      readingNoticeEl.textContent =
        `Gemini 요청에 실패했어요 (${err.message}). 우선 내장 해석으로 들려드릴게요. ⚙ 설정에서 API 키를 확인해 주세요.`;
      readingNoticeEl.hidden = false;
      readingModeEl.textContent = "데모 해석";
      readingModeEl.classList.remove("live");
      typer.push(buildDemoReading());
    }
    typer.end();
  }
}

async function streamGemini(key, prompt, signal, onText) {
  const res = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": key },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.9,
        maxOutputTokens: 4096,
        thinkingConfig: { thinkingBudget: 0 } // 첫 글자가 빨리 나오도록 사고 단계 생략
      }
    }),
    signal
  });

  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const data = await res.json();
      if (data?.error?.message) msg += ` · ${data.error.message.slice(0, 120)}`;
    } catch { /* 본문이 JSON이 아님 */ }
    throw new Error(msg);
  }

  // Server-Sent Events 파싱: "data: {...}" 줄마다 텍스트 조각이 들어온다
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  const handleLine = (line) => {
    line = line.trim();
    if (!line.startsWith("data:")) return;
    const payload = line.slice(5).trim();
    if (!payload || payload === "[DONE]") return;
    try {
      const json = JSON.parse(payload);
      const parts = json.candidates?.[0]?.content?.parts || [];
      parts.forEach((p) => { if (p.text && !p.thought) onText(p.text); });
    } catch { /* 불완전한 줄은 무시 */ }
  };

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let idx;
    while ((idx = buffer.indexOf("\n")) >= 0) {
      handleLine(buffer.slice(0, idx));
      buffer = buffer.slice(idx + 1);
    }
  }
  if (buffer) handleLine(buffer);
}

function buildPrompt() {
  const cards = pickedCards();
  const cardLines = cards.map(({ card, reversed }, i) => {
    const dir = reversed ? "rev" : "up";
    return `${i + 1}. ${POSITIONS[i].label}: ${card.numeral}번 ${card.name} (${card.en}) — ${orientText(reversed)} / 키워드: ${card.keywords[dir].join(", ")}`;
  }).join("\n");

  const headings = cards.map(({ card, reversed }, i) =>
    `### ${POSITIONS[i].label} · ${card.name} (${orientText(reversed)})\n(이 카드가 고민과 관련해 ${POSITIONS[i].label}에 어떤 의미인지, 상담자의 상황에 맞춰 3~4문장)`
  ).join("\n");

  return `[상담자의 고민]
"${state.concern}"

[뽑힌 카드 — 과거·현재·미래 3장 스프레드]
${cardLines}

아래 형식을 정확히 지켜 한국어로 리딩해 주세요.
마크다운은 ##, ###, **굵게**, - 목록만 사용하고, 표나 코드 블록은 쓰지 마세요.
첫 줄에는 상담자의 고민에 공감하는 짧은 인사 한두 문장을 써 주세요.

## ① 카드별 현재 상황 분석
${headings}

## ② 세 장의 카드가 들려주는 이야기
(세 카드를 과거에서 미래로 이어지는 하나의 이야기로 엮어 5~7문장)

## ③ 현실적인 조언
- (고민에 맞춰 바로 실천할 수 있는 구체적인 조언 3가지를 목록으로)

마지막 줄은 따뜻한 응원 한 문장으로 마무리해 주세요.`;
}

function detectTopic(text) {
  let best = "advice";
  let bestScore = 0;
  ["love", "career", "money"].forEach((key) => {
    const score = TOPICS[key].words.filter((w) => text.includes(w)).length;
    if (score > bestScore) { best = key; bestScore = score; }
  });
  return best;
}

function buildDemoReading() {
  const topic = detectTopic(state.concern);
  const cards = pickedCards();
  const dirs = cards.map((c) => (c.reversed ? "rev" : "up"));
  const kw = cards.map((c, i) => c.card.keywords[dirs[i]]);
  const upCount = cards.filter((c) => !c.reversed).length;

  let out = `“${state.concern}”\n이 고민을 안고 오늘 밤 이곳까지 찾아오셨군요. 세 장의 카드가 ${TOPICS[topic].label}에 대해 조용히 이야기를 건네고 있어요.\n\n`;

  out += "## ① 카드별 현재 상황 분석\n";
  cards.forEach(({ card, reversed }, i) => {
    out += `### ${POSITIONS[i].label} · ${card.name} (${orientText(reversed)})\n`;
    out += `**${kw[i].map((k) => "#" + k).join(" ")}**\n`;
    out += `${POSITIONS[i].intro} ${josa(card.name, "은", "는")} ‘${josa(kw[i][0], "’과", "’와")} ‘${kw[i][1]}’의 기운을 품고 있어요. ${card[dirs[i]][topic]}\n\n`;
  });

  const [a, b, c] = cards.map((x) => x.card);
  const flow = {
    3: "세 장 모두 정방향으로, 별들이 당신의 길을 환하게 비추고 있어요. 지금의 흐름을 믿고 나아가도 좋습니다.",
    2: "전반적으로 순조로운 기운이에요. 역방향 카드가 건네는 작은 경고만 마음에 새겨두면 충분합니다.",
    1: "조금 흐린 밤이지만 한 줄기 빛이 남아 있어요. 정방향 카드의 메시지를 등불 삼아 천천히 걸어가세요.",
    0: "세 장 모두 역방향이에요. 지금은 멈춰서 돌아볼 때라는 신호이지요. 어둠이 깊을수록 새벽은 가까워요."
  }[upCount];

  out += "## ② 세 장의 카드가 들려주는 이야기\n";
  out += `과거의 ${josa(a.name, "이", "가")} 남긴 ‘${kw[0][0]}’의 흔적은, 지금 ${josa(b.name, "이", "가")} 보여주는 ‘${kw[1][0]}’의 시간으로 이어지고 있어요. `;
  out += `그리고 그 길의 끝에서 ${c.name} 카드가 ‘${josa(kw[2][0], "’이라는", "’라는")} 열쇠를 건네고 있습니다. `;
  out += `${flow} 지나온 경험이 지금의 당신을 만들었고, 지금의 선택이 다가올 장면을 그려간다는 것을 잊지 마세요.\n\n`;

  out += "## ③ 현실적인 조언\n";
  out += `- **지금 할 일:** ${cards[1].card[dirs[1]].advice}\n`;
  out += `- **미래를 위해:** ${cards[2].card[dirs[2]].advice}\n`;
  out += `- **현실적인 한 걸음:** ${TOPICS[topic].tip}\n\n`;
  out += "카드는 정해진 운명이 아니라 지금의 흐름을 비추는 거울이에요. 당신의 선택이 가장 강한 마법이랍니다. ☾";
  return out;
}

/* ---------- 12. 타자기 효과 ---------- */
class Typewriter {
  constructor(target, onDone) {
    this.target = target;
    this.onDone = onDone;
    this.buffer = "";   // 지금까지 받은 전체 텍스트
    this.shown = 0;     // 화면에 표시된 글자 수
    this.ended = false; // 더 이상 받을 텍스트가 없음
    this.running = false;
    this.timer = null;
    this.render();
  }
  push(text) { this.buffer += text; this.kick(); }
  end() { this.ended = true; this.kick(); }
  start() { this.running = true; this.render(); this.kick(); }
  stop() { clearInterval(this.timer); this.timer = null; this.running = false; }
  skip() { this.shown = this.buffer.length; this.render(); this.kick(); }

  kick() {
    if (!this.running || this.timer) return;
    this.timer = setInterval(() => this.tick(), 22);
  }

  tick() {
    const remaining = this.buffer.length - this.shown;
    if (remaining <= 0) {
      clearInterval(this.timer);
      this.timer = null;
      this.render();
      if (this.ended) this.onDone?.();
      return;
    }
    // 밀린 글자가 많으면 조금 빠르게 타이핑
    this.shown += remaining > 300 ? 4 : remaining > 80 ? 2 : 1;
    this.render();
  }

  render() {
    if (!this.running) return;
    const text = this.buffer.slice(0, this.shown);
    const finished = this.ended && this.shown >= this.buffer.length;
    if (!text) {
      this.target.innerHTML = `<p class="loading">타로 마스터가 카드의 목소리에 귀 기울이고 있어요…</p>`;
      return;
    }
    this.target.innerHTML = renderMarkdown(text) + (finished ? "" : '<span class="cursor"></span>');
    // 커서를 마지막 블록 안으로 옮겨 글자 바로 뒤에서 깜빡이게
    const cursor = this.target.querySelector(".cursor");
    const last = cursor?.previousElementSibling;
    if (cursor && last) (last.lastElementChild?.tagName === "LI" ? last.lastElementChild : last).appendChild(cursor);
  }
}

btnSkip.addEventListener("click", () => state.typer?.skip());

// 간단한 마크다운 → HTML (##, ###, **굵게**, _기울임_, - 목록)
function renderMarkdown(src) {
  const inline = (s) =>
    s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
     .replace(/(^|\s)_(.+?)_(?=\s|$)/g, "$1<em>$2</em>")
     .replace(/\*\*/g, ""); // 타이핑 중 아직 닫히지 않은 ** 숨김

  let html = "";
  let inList = false;
  const closeList = () => { if (inList) { html += "</ul>"; inList = false; } };

  escapeHtml(src).split("\n").forEach((raw) => {
    const line = raw.trim();
    if (!line) { closeList(); return; }
    let m;
    if ((m = line.match(/^###\s+(.*)/))) { closeList(); html += `<h4>${inline(m[1])}</h4>`; }
    else if ((m = line.match(/^#{1,2}\s+(.*)/))) { closeList(); html += `<h3>${inline(m[1])}</h3>`; }
    else if ((m = line.match(/^[-*•]\s+(.*)/))) {
      if (!inList) { html += "<ul>"; inList = true; }
      html += `<li>${inline(m[1])}</li>`;
    } else { closeList(); html += `<p>${inline(line)}</p>`; }
  });
  closeList();
  return html;
}

/* ---------- 13. 다시 뽑기 ---------- */
btnReset.addEventListener("click", () => {
  state.session++;
  state.controller?.abort();
  state.typer?.stop();
  state.timers.forEach(clearTimeout);
  state.timers = [];
  state.deck = [];
  state.picked = [];
  deckEl.innerHTML = "";
  spreadEl.innerHTML = "";
  readingBodyEl.innerHTML = "";
  readingEl.hidden = true;
  syncConcern(); // 이전 고민은 입력창에 남겨두어 수정하거나 그대로 다시 볼 수 있게
  showScreen("ask");
});

/* ---------- 14. 시작 ---------- */
createStars();
updateModeChip();
syncConcern();

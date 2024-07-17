# 📖 UXPlorer

<div align="center">
<img width="300px" src="https://github.com/erv2bh/uxplorer-client/assets/101324787/d4461e65-deb6-4593-bda5-67fa812eba12" />

UXPlorer는 테스트 유저를 테스트해 주고 기록을 분석해, 데이터를 시각화해 주는 User Test B2B SaaS 입니다.

<br>
</div>

# Links

<p align="center" style="display: flex; justify-content: space-evenly;">
  <a href="https://web.ux-plorer.com">Deployed website</a>
  <span> | </span>
  <a href="https://github.com/erv2bh/uxplorer-client">Frontend Repository</a>
  <span> | </span>
  <a href="https://github.com/erv2bh/uxplorer-server">Backend Repository</a>
</p>

# Table of Contents
- [Features](#features)
- [Challenges](#challenges)
  - [1. 사용성 테스트](#1-사용성-테스트)
    - [1-1 온라인으로 사용성 테스트 진행하기](#1-1-온라인으로-사용성-테스트-진행하기)
  - [2. 사용자(서비스 이용자)와 테스터의 구분](#2-사용자서비스-이용자와-테스터의-구분)
    - [2-1 사용자와 테스터를 구분할 수 있는 방법 찾기](#2-1-사용자와-테스터를-구분할-수-있는-방법-찾기)
    - [2-2 테스트 환경을 독립적으로 관리하기](#2-2-테스트-환경을-독립적으로-관리하기)
  - [3. 테스트 미션 수행 로직](#3-테스트-미션-수행-로직)
    - [3-1 현재 미션에서 다음 미션으로의 원할한 이동](#3-1-현재-미션에서-다음-미션으로의-원할한-이동)
    - [3-2 테스터의 피드백 반영하기](#3-2-테스터의-피드백-반영하기)
  - [4. 테스트 화면 녹화 및 저장](#4-테스트-화면-녹화-및-저장)
    - [4-1 테스트 화면의 녹화 데이터 저장하기](#4-1-테스트-화면의-녹화-데이터-저장하기)
    - [4-2 다양한 플랫폼에서 미디어의 호환성 보장하기](#4-2-다양한-플랫폼에서-미디어의-호환성-보장하기)
- [Tech Stacks](#tech-stacks)
- [Schedule](#schedule)

<br>

# Features

## **테스트 진행 기능**
<p align="center">
  <img width="700px" src="https://github.com/erv2bh/uxplorer-client/assets/101324787/6174be14-5031-4a69-bcfd-26deaa63bea4" />
</p>

- 테스터는 테스트 환경에서 UX 테스트를 진행 할 수 있습니다.
  - 화면 녹화 공유 기능을 제공함으로써 정량적 지표를 뒷받침 해줍니다.
  - 테스트 완료 후 테스터가 설문 작성을 할 수 있도록 설문 페이지를 제공합니다.

<br>

## **새로운 테스트 생성 기능**
<p align="center">
  <img width="700px" src="https://github.com/erv2bh/uxplorer-client/assets/101324787/ad82ca36-71c9-4f89-8ae8-50e53d7aca9d" />
</p>

- 서비스 이용자는 서비스를 테스트하기 위한 테스트를 만들 수 있습니다.
  - 테스트 이름, 테스트 상세 설명, 테스트 URL, 테스터 이메일, 마감 날짜를 입력합니다.
  - 테스트에서 진행할 미션과 미션별 예상 소요시간을 입력합니다.

<br>

## **테스트 세부 정보 및 결과 보기 기능**
<p align="center">
  <img width="700px" src="https://github.com/erv2bh/uxplorer-client/assets/101324787/5f18f55e-cf00-4ac0-8a08-660ff7fed831" />
</p>

- 서비스 이용자는 생성한 테스트에 대한 세부 정보 및 결과를 볼 수 있습니다.
  - 통합 결과의 경우 미션 수행률, 미션별 평균 소요시간, 서비스 만족도 및 추천 지수의 통계가 그래프로 나타납니다.
  - 유저별 결과의 경우 유저별 세부 미션 수행사항 및 피드백 정보가 보여집니다.

<br>


# Challenges
## 1. 사용성 테스트

<div align="center">
  <img width="700px" src="https://github.com/erv2bh/uxplorer-client/assets/101324787/451faabf-3a81-47b6-a331-02ff5f53a98b" />
</div>

<br>

프로토타입 제작중에 과연 사람들이 이 서비스를 잘 사용할 수 있는지, 혹시 사용하기 어렵거나 복잡하지 않을지 고민이 됩니다. 이때 사용성 테스트를 통해 사용자들이 서비스를 목적에 맞게 잘 사용할 수 있는지 알 수 있습니다. 좀 더 사용자 친화적인 서비스로의 발전을 위해 필수적인 요소입니다.

UXPlorer는 오프라인에서 진행되는 사용성 테스트를 온라인으로 진행해 보면 편하지 않을까 하는 단순한 호기심에서 시작되었습니다.

오프라인에서 진행되는 사용성 테스트는 다섯가지의 UX KPIs(Key Performance Indicators)를 기준으로 통계를 냅니다.

- ***UX KPIs(Key Performance Indicators)***
  - Task Success Rate (필요한 것을 찾아 해결한 사람이 몇명인지)
  - Time on Task (필요한 것을 얼마나 빨리 찾아 끝냈는지)
  - System Usability Scale : SUS (제품에 얼마나 만족을 하는지) 질문지
  - Use of Search vs. Navigation (필요한 것을 찾기 위해 몇명이 내비게이션을 사용하고 몇명이 검색 기능을 썼는지)
  - User Error Rate(오류가 몇번 발생했는지 어떻게 해서 그런 오류가 떴는지)

### 1-1 온라인으로 사용성 테스트 진행하기
<div align="center">
  <img width="700px" src="https://github.com/erv2bh/uxplorer-client/assets/101324787/014c6c12-7306-4d20-960c-a71d0af0665d" />
</div>

#### 1-1-1 고려사항: 온라인에서 참고할만한 UX KPI 선별
오프라인에서 진행되는 사용성 테스트를 온라인에서 진행할 때, 성과 지표를 어떻게 통계화할 수 있을지 고민이 되었습니다. 온라인 환경에서 정확한 데이터 수집과 분석이 어려울 수 있다고 생각했습니다. 또한, 테스터의 자발적인 참여를 유도하는 방법도 고려해야 했습니다.

#### 1-1-2 접근 방법: 정량적 지표와 정성적 지표 설정
정량적 지표와 정성적 지표를 기반으로 한 통계는 사용자로 하여금 보다 객관적인 데이터를 제공합니다.
더욱이 UXPlorer의 경우 온라인 플랫폼이다 보니 두가지 지표가 절대적이었습니다.

#### 1. 정량적 지표
온라인에서 구현 가능한 지표를 추려보니
- 미션 수행률: 미션별 통과 여부 통계 시각화
- 미션 소요시간: 미션별 소요시간 통계 시각화
- 서비스 만족도 점수: System Usability Scale을 토대로 서비스 만족도 통계 시각화

위의 세가지 지표를 정량화 할 수 있었습니다.

각 테스트 별로 서비스 이용자(기업)가 테스터들에게 제공할 미션을 작성할 수 있습니다. 테스터는 모달을 이용하여 본인에게 주어진 미션을 수행하도록 했습니다.

<div align="center">
  <img width="300px" src="https://github.com/erv2bh/uxplorer-client/assets/101324787/d0141a9b-0652-48ca-960c-71b3db878359" />
</div>

- **미션 수행률** - 서비스 이용자는 테스터의 미션 성공 여부를 어떻게 판단할 수 있을까요? 이를 위해 각 미션지에 **건너뛰기** 항목을 부여해 주어 테스터가 자발적으로 미션을 수행하지 못하였다는 근거로 수행 여부를 데이터화 하였습니다. **건너뛰기**의 경우 서비스 이용자가 미션을 작성할 때 미션별 예상 소요시간을 설정해 두고 예상 소요시간이 경과하면 테스터가 **건너뛰기** 항목을 선택할 수 있게 하였습니다. 테스터가 미션을 건너뛰었을 경우 해당 미션은 실패로 간주됩니다.

- **미션 소요시간** - 각 미션별로 테스터가 미션을 **완료한 시간**을 알 수 있다면, 그리고 서비스 이용자가 서비스 기획 시 해당 기능을 완료할거라는 **예상 소요시간**에 대한 정보가 있다면 미션 소요시간을 통계화 하여 정량적 지표로 삼을 수 있습니다. 이 때 미션 소요시간의 데이터는 성공한 미션에 한정하여 통계에 사용합니다. 따라서 테스터가 **건너뛰기** 항목을 선택하였을 경우의 데이터는 무시됩니다.

- **서비스 만족도 점수** - 설문지 작성을 통하여 테스터는 서비스 이용에 대한 만족도를 평가할 수 있고 이는 수치화 시킬 수 있으며 당연히 서비스 이용자에게 제공됩니다. 서비스 이용자는 수치화된 테스터별 만족도를 그래프화 하여 시각적으로 비교 할 수 있습니다.

#### 2. 정성적 지표
- **테스터의 적극적인 참여** - 테스터는 미션 수행 시 미션에 관하여 피드백을 자유롭게 남길 수 있습니다. 이 피드백은 서비스 이용자에게 제공되며 테스터의 의견을 적극 반영할 수 있게 됩니다.

- **NPS 점수** - NPS 점수는 기업이나 제품의 고객 충성도와 만족도를 간단하면서도 효과적으로 측정하는 지표입니다. 이 점수는 고객이 제품이나 서비스를 다른 사람에게 추천할 가능성을 0부터 10까지의 척도로 나타내며, 이를 통해 추천자, 중립자, 비평자의 세 그룹으로 분류합니다.

이러한 접근 방법을 통해 UXPlorer는 온라인에서의 사용성 테스트를 보다 효과적으로 수행할 수 있게 되었고, 사용자 경험을 더욱 향상시킬 수 있는 중요한 데이터를 수집할 수 있었습니다.

<br>
<br>

## 2. 사용자(서비스 이용자)와 테스터의 구분

<div align="center">
  <img width="700px" src="https://github.com/erv2bh/uxplorer-client/assets/101324787/b7c8df2a-9fd2-4e1c-a524-1746dee46c17" />
  <br>
  <strong>Figma를 활용한 유저 플로우 설계</strong>
</div>

### 2-1 사용자와 테스터를 구분할 수 있는 방법 찾기
#### 2-1-1 고려사항: 보안 및 접근 권한
UXPlorer 에서 사용자와 테스터의 역할을 명확하게 구분하는 것이 필요했습니다. 이유는 다음과 같습니다.

- UXPlorer의 데이터 보안을 강화하기 위해 사용자는 데이터를 생성, 수정, 삭제할 수 있는 권한을 가지지만, 테스터는 주어진 테스트에 필요한 정보만을 열람할 수 있어야 합니다.
- 무분별한 데이터 접근을 방지하고, 테스터는 자신에게 할당된 테스트에만 접근할 수 있도록 제한해야 합니다.
- 사용자는 테스트를 관리하고 분석하는 데 필요한 다소 복잡한 인터페이스를 사용하고, 테스터는 간단하고 직관적인 인터페이스를 사용해야 합니다.

#### 2-1-2 접근 방법: 사용자와 테스터의 로그인 방식 구분
로그인 방식을 달리 적용하여 사용자와 테스터를 구분하였습니다.

- **사용자 로그인:** 사용자는 Google Firebase를 사용하여 시스템에 로그인하도록 설계했습니다. 이 방식은 사용자를 식별하고 인증하는 데 사용되며, 사용자가 시스템에서 테스트를 생성하고 관리할 수 있게 합니다.
- **테스터 로그인:** 테스터는 생성된 테스트의 `title`을 기반으로 한 고유한 테스터 ID와 비밀번호를 이메일로 부여받도록 설계했습니다. 테스터는 이 ID와 비밀번호를 사용하여 로그인하며, 이는 테스터가 특정 테스트에만 접근할 수 있도록 제한합니다. 비밀번호는 보안을 위해 bcrypt를 사용하여 해시되어 데이터베이스에 저장됩니다.

  ```jsx
  const testerPassword = `${Math.random().toString(36).substring(2, 8)}`;
  const hashedTesterPassword = await bcrypt.hash(testerPassword, saltRounds);
  ```

#### ❗️ 문제 사항
하지만 테스트의 `title`이 중복될 경우 동일한 테스터 ID가 생성되는 문제가 있었습니다.

#### 💡 해결 방법
이 문제를 해결하기 위해, 테스트 생성 시 서버의 데이터베이스에서 이미 존재하는 테스트 제목을 검사하여 중복을 방지합니다. 이 방법을 통해 데이터의 일관성을 유지하고 테스터 ID의 고유성을 확보할 수 있었습니다.

  ```jsx
  const existingTest = await Test.findOne({ title: testName });

  if (existingTest) {
    return res.status(400).json({ error: "Same Title already existed" });
  }
  ```

이 접근 방법을 통해 데이터 보안을 강화하고, 사용자와 테스터의 역할을 명확하게 구분할 수 있었습니다. 이를 통해 무분별한 데이터 접근을 방지하고, 각 사용자가 자신의 역할에 맞는 인터페이스를 효율적으로 사용할 수 있게 되었습니다.

<br>

### 2-2 테스트 환경을 독립적으로 관리하기
#### 2-2-1 고려사항: 데이터 정규화와 관리
UXPlorer의 관건은 얼마나 재미있고 유용한 데이터를 모을 수 있느냐였습니다. 이러한 데이터는 사용자에게 더욱 도움이 되는 요소라 생각했습니다. 따라서 각 테스트 환경을 독립적으로 관리하면서도 유용한 데이터를 수집하는 것이 중요했습니다.

#### 2-2-2 접근 방법: MongoDB 스키마 설계
이를 위해 MongoDB의 스키마 설계 시 Embedded 방식과 Reference 방식을 비교해 볼 필요가 있었습니다.

MongoDB 공식문서에 따르면 Embedded 방식과 Reference 방식은 다음과 같은 차이점이 있습니다.

| 방식            |장점                                                           | 단점                                                              |
|----------------|--------------------------------------------------------------|-------------------------------------------------------------------|
| Embedded 방식  | Document 내에 관련 데이터가 직접 포함되므로 조회 속도가 빠릅니다.  | 데이터 업데이트가 복잡하고, 중복이 발생할 수 있습니다.                       |
| Reference 방식 | Document 간의 관계를 ID 참조를 통해 맺으므로, 데이터 정규화가 용이하고, 업데이트가 간단합니다. | 조회 시 추가적인 조인이 필요하므로 속도가 다소 느릴 수 있습니다. |


결과적으로 데이터 정규화가 용이하고 업데이트가 간단하기 때문에 테스트, 테스터, 그리고 미션 데이터는 MongoDB의 Reference 방식으로 설계하였습니다. 이 방식은 각 테스트 환경을 독립적으로 관리할 수 있게 합니다.

- **테스트 및 미션 관리:** 각 테스트는 여러 미션을 포함하고, 이 미션들은 Mission Collection에 독립적으로 저장됩니다. 각 테스터는 Tester Collection에 저장되며, 각 테스터 스키마는 수행해야 할 미션의 ID 배열을 참조합니다.

  ```jsx
  const missionPromises = missions.map(async (mission, index) => {
    const newMission = await Mission.create({
      description: mission.description,
      expectedDuration: mission.expectedDuration,
      order: index,
      completedBy: testerIds.map((testerId) => ({ tester: testerId })),
    });
    return newMission._id;
  });
  ```

- **미션 참조 업데이트:** 테스터 및 테스트 문서는 미션 ID를 참조하여 각 테스터와 테스트가 관련 미션을 추적할 수 있도록 합니다. 이는 테스터가 자신에게 할당된 미션만을 볼 수 있도록 하며, 각 테스트 환경을 독립적으로 유지합니다.

  ```jsx
  await Tester.findByIdAndUpdate(testerId, {
    $push: { missions: { $each: missionIds } },
  });
  ```

이 접근 방법을 통해 각 테스트 환경을 독립적으로 관리하면서도 유용한 데이터를 수집할 수 있었습니다. 이는 사용자에게 더욱 도움이 되는 요소로 작용할 수 있었습니다.

<br>
<br>

## 3. 테스트 미션 수행 로직

<div align="center">
  <img width="700px" src="https://github.com/erv2bh/uxplorer-client/assets/101324787/4d70aec2-f83d-441e-8bfc-caf569302c74" />
  <br>
  <strong>테스트 환경 흐름도</strong>
</div>

<br>

테스터는 이메일로 부여받은 테스트 ID 및 비밀번호를 사용하여 테스트 환경에 진입할 수 있게 설계했습니다. 또한 테스터 로그인시 웰컴 모달을 활용하여 현재 진행될 테스트에 대한 설명을 해주었습니다.

### 3-1 현재 미션에서 다음 미션으로의 원할한 이동
#### 3-1-1 고려사항: 미션간 원할한 이동
테스트 수행은 모달창에 의해 미션별로 진행됩니다. 테스터가 현재 미션을 완료한 후 다음 미션으로 원활히 이동할 수 있도록 설계가 필요했습니다.

#### 3-1-2 접근 방법: Jotai를 이용한 상태 관리
전역 상태로 미션 인덱스를 관리하는 것은 여러 컴포넌트에서 미션 데이터를 공유하고 업데이트할 수 있게 해줍니다. 이를 통해 각 미션의 상태를 쉽게 추적하고, 미션 완료 후 다음 미션으로의 원활한 이동을 설계할수 있었습니다.

Redux, Justand 등 스토어 기반의 상태관리 라이브러리를 최초 생각했으나, 서버 상태를 react-query가 관리해주고 있기에 클라이언트의 상태는 보다 간결한 디자인 패턴으로 관리하는게 좋겠다고 판단 했습니다.

이에 따라 atom으로 상태를 관리하는 **Jotai**를 선택 했으며, 컴포넌트 별로 Jotai의 읽기 전용 혹은 쓰기 전용 atom을 활용하여 상태를 관리하였습니다.

**1. 미션 인덱스 관리:** 미션들의 ID 배열을 Jotai 기반 전역 상태(testerMissionsDataAtom)에서 관리하여, 현재 미션의 인덱스를 쉽게 찾을 수 있도록 했습니다. 이 배열을 사용하여, 각 미션의 완료 후 다음 미션으로의 라우팅 경로를 동적으로 생성할 수 있었습니다.

  미션 인덱스 관리 예시 코드
  ```js
  const missionIds = useAtomValue(testerMissionsDataAtom);
  const currentMissionIndex = missionIds.findIndex((id) => id === missionId);
  ```

**2. 자동 라우팅 로직:** navigateToNextMission 함수는 현재 미션 인덱스를 기반으로 다음 미션의 인덱스를 계산합니다. 만약 다음 미션 인덱스가 배열 길이 내에 있다면, 해당 미션 ID로 라우팅을 업데이트합니다. 모든 미션을 완료했을 경우, 테스터를 설문 조사 페이지로 리디렉션합니다.

**3. 화면 녹화 중지:** 각 미션의 완료 시, 화면 녹화를 중지(screenRecorder.stop())하고 서버에 데이터를 전송하는 로직을 수행합니다.

  자동 라우팅 및 화면 녹화 중지 예시 코드
  ```js
  function navigateToNextMission() {
    const nextMissionIndex = currentMissionIndex + 1;
    if (nextMissionIndex < missionIds.length) {
      const nextMissionId = missionIds[nextMissionIndex];
      navigate(`/tester/${testerId}/mission/${nextMissionId}`);
    } else {
      screenRecorder.stop(); // 화면 녹화 중지
      navigate(`/tester/${testerId}/survey`);
    }
  }
  ```

이 접근 방법을 통해 테스터가 미션을 원활하게 수행하고 다음 미션으로 이동할 수 있는 효율적인 시스템을 구축할 수 있었습니다. 또한, 전역 라이브러리인 Jotai를 이용, 각 미션의 상태를 효과적으로 관리할 수 있게 되었습니다.

<br>

### 3-2 테스터의 피드백 반영하기
#### 3-2-1 고려사항: 피드백 수집과 활용
테스터의 피드백을 효과적으로 수집하고 시스템 개선에 활용하는 것이 필요했습니다.

#### 3-2-2 접근 방법: 피드백 입력 및 저장
테스터는 미션 수행 시 미션에 관하여 피드백을 자유롭게 남길 수 있도록 설계하였습니다. 이 피드백은 사용자에게 제공되며 테스터의 의견을 적극 반영할 수 있게 됩니다.

테스터의 피드백을 수집하고 이를 시스템 개선에 활용하는 절차는 다음과 같습니다:

**1. 피드백 입력 인터페이스:** 테스터는 FeedbackTextarea 컴포넌트를 통해 피드백을 입력할 수 있습니다. 피드백은 로컬 상태(feedback)에 저장되며, `저장` 버튼 클릭 시 서버로 전송 준비가 완료됩니다.

  피드백 입력 인터페이스 예시 코드
  ```js
  // 피드백 입력 인터페이스
  const [feedback, setFeedback] = useState(""); // 로컬 상태

  function handleFeedbackChange(event) {
    setFeedback(event.target.value); // 입력한 피드백을 상태에 저장
  }

  function handleFeedbackSubmit() {
    setIsFeedbackOpen(false); // 피드백 입력 인터페이스 닫기
  }
  ```
**2. 서버에 피드백 전송:** 피드백과 관련된 데이터는 handleNextMission 및 handleSkipMission 함수를 통해 처리됩니다. 이들 함수는 미션 완료 또는 건너뛰기 데이터와 함께 피드백을 서버로 전송합니다. 전송 성공 후, 사용자는 자동으로 다음 미션으로 이동하거나 설문 조사를 수행할 수 있습니다.

  서버에 피드백 전송 예시 코드
  ```js
  // 서버에 피드백 전송
  function handleNextMission() {
    const missionCompletionData = {
      completed: true,
      createdAt: new Date(new Date() - missionTime * 1000),
      completedAt: new Date(),
      duration: missionTime,
      feedback,
    };

    setFeedback(""); // 피드백 상태 초기화

    updateMissionData(missionCompletionData, {
      onSuccess: () => {
        navigateToNextMission(); // 전송 성공 시 다음 미션으로 이동
      },
    });
  }
  ```

이 접근 방법을 통해 테스터의 피드백을 효과적으로 수집하고 이를 시스템 개선에 반영할 수 있었습니다. 이는 사용자 경험을 더욱 향상시키는 데 기여하였습니다.
<br>
<br>

## 4. 테스트 화면 녹화 및 저장

오프라인에서의 다섯가지의 성과 지표를 기준으로 온라인에서 구현해야할 미션 수행률, 미션 소요시간, 그리고 서비스 만족도 점수를 구현하였습니다. 하지만 이 지표들은 어디까지나 테스터의 재량에 맡기게 되어 온라인상에서 완벽한 데이터를 추출하는 데에는 한계가 있다고 생각했습니다. 따라서 **UXPlorer**는 **화면녹화 기능**을 제공하여 온라인 상에서 테스터를 Observation 하는 용도로 사용하고 서비스 이용자는 테스터의 화면 녹화본을 추가적인 정량적 지표를 보는데에 사용할 수 있도록 설계가 필요했습니다.

### 4-1 테스트 화면의 녹화 데이터 저장하기
#### 4-1-1 고려사항: 안정적인 미디어 스트림 수집과 저장
테스트 화면 녹화 기능을 구현하기 위해서는 안정적인 미디어 스트림 수집과 저장 방식이 필요했습니다. 또한 화면 녹화 데이터를 효율적으로 서버에 전송하고 저장할 수 있는 방법을 찾아야 했습니다.

#### 4-1-2 접근 방법: MediaDevice 인터페이스 사용
크롬 브라우저 기준으로 특정 탭의 화면 녹화 기능을 구현하기 위해서 MediaDevice 인터페이스의 getMediaDisplay 메서드를 사용하였습니다. MediaDevice 인터페이스는 미디어 데이터를 제공하는 모든 하드웨어로 접근할 수 있는 방법을 제공해줍니다.

  **1. 화면 녹화 시작**
  ```js
  const stream = await navigator.mediaDevices.getDisplayMedia({
    video: true,
    preferCurrentTab: true,
  });
  ```
  테스터의 화면 녹화를 시작하는 코드입니다. getDisplayMedia() 메서드는 사용자의 전체 화면 또는 특정 탭의 미디어 스트림을 반환해줍니다. 여기서는 preferCurrentTab: true 옵션을 사용해 현재 활성 탭만 녹화하도록 설정했습니다.

  **2. 미디어 데이터의 수집**
  ```js
  const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
  const chunks = [];
  recorder.ondataavailable = (e) => chunks.push(e.data);
  ```
  MediaRecorder 객체를 이용하여 녹화된 스트림을 처리하도록 구현하였습니다. 이 객체는 설정된 mimeType에 따라 데이터를 인코딩하고, ondataavailable 이벤트를 통해 녹화 데이터를 chunks 배열에 저장합니다.

  **3. 녹화 종료 및 데이터 처리**
  ```js
  recorder.onstop = async () => {
    const blob = new Blob(chunks, { type: "video/mp4" });
    const formData = new FormData();
    formData.append("video", blob, `${fileName}.mp4`);
  };
  ```
  녹화가 종료되면 (recorder.onstop 이벤트), chunks 배열에 저장된 비디오 데이터는 Blob 객체로 변환되며, 이는 서버로 전송 준비를 위해 FormData 객체에 추가됩니다.

  **4. 리소스 정리**
  ```js
  stream.getTracks().forEach((track) => track.stop());
  ```
  녹화가 완료된 후에는 사용된 모든 미디어 트랙을 종료합니다.

이 접근 방법을 통해 안정적이고 효율적인 화면 녹화 기능을 구현할 수 있었으며, 녹화 데이터를 안정적으로 서버에 저장할 수 있었습니다. 이를 통해 온라인 상에서 더 정확한 사용성 테스트 데이터를 수집할 수 있게 되고 그 근거를 뒷받침 할 수 있었습니다.
<br>

### 4-2 다양한 플랫폼에서 미디어의 호환성 보장하기

<div align="center">
  <img width="700" src="https://github.com/erv2bh/uxplorer-client/assets/101324787/b06d4028-42b6-48f2-83c4-aa5d945bb2dd">
</div>

#### 4-2-1 고려사항: 미디어 파일 형식 선택
화면 녹화 기능 구현 시 미디어 파일 형식의 선택은 다양한 플랫폼에서 호환성을 보장하는 데 중요한 역할을 한다고 생각했습니다. 대표적으로 MP4와 WebM이 있는데, 두 파일 형식의 기술적 이해가 필요했습니다.

#### 4-2-2 접근 방법: WebM과 MP4 비교
  **1. WebM과 MP4의 비교**

  - **WebM**: Google에 의해 개발된 오픈 소스 비디오 포맷으로, 주로 VP8 및 VP9 비디오 코덱과 Vorbis 또는 Opus 오디오 코덱을 사용합니다. WebM은 특히 HTML5 웹 비디오 플레이어에서 널리 지원되며, 웹 기반 스트리밍에 최적화되어 있습니다.
  - **MP4**: H.264/AVC 또는 H.265/HEVC 비디오 코덱과 AAC 오디오 코덱을 사용하는 보다 범용적인 미디어 컨테이너 포맷입니다. MP4는 거의 모든 시스템 및 장치에서 널리 지원되며, 고품질 스트리밍 및 저장 옵션을 제공합니다.

  **2. 플랫폼 및 디바이스 호환성**

  - **브라우저 호환성**: WebM은 주로 Firefox, Chrome 및 Opera와 같은 웹 브라우저에서 널리 지원되지만, Safari와 일부 모바일 브라우저에서는 제한적인 지원을 받습니다. 반면, MP4 (특히 H.264 코덱 사용 시)는 거의 모든 주요 데스크탑 및 모바일 브라우저에서 지원됩니다.

  - **저장 및 다운로드 가능성**: 클라우드 스토리지 서비스 및 콘텐츠 전송 네트워크에서 MP4 파일은 표준적인 비디오 형식으로 간주되어 다운로드 및 스트리밍이 용이합니다. Amazon S3와 같은 서비스에서는 MP4 파일을 우선적으로 지원하며, 이는 WebM 형식에 비해 접근성 및 호환성 면에서 큰 이점을 제공합니다.

  **3. 기술적 구현**

  코드 예시에서 getDisplayMedia 를 사용하여 녹화된 스트림을 video/webm 로 초기 설정하였으나, 최종적으로는 Blob 생성 시 video/mp4 형식으로 변환하여 저장하도록 구현하였습니다. 이는 MP4 형식의 범용성과 호환성을 활용하기 위함입니다. 서버로 전송된 후, MP4 파일은 다양한 장치 및 플랫폼에서 문제 없이 재생될 수 있으며, 필요한 경우 다른 형식으로의 추가 변환 없이 바로 사용될 수 있도록 하기 위함이었습니다.

이 접근 방법을 통해 다양한 플랫폼에서 호환성이 보장되는 미디어 파일 형식을 사용하여 안정적인 화면 녹화 기능을 제공할 수 있었습니다. 이를 통해 더 많은 사용자에게 일관된 경험을 제공할 수 있게 되었습니다.

# Tech Stacks

### Client

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Tanstack Query](https://img.shields.io/badge/-Tanstack%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white) ![Jotai](https://img.shields.io/badge/Jotai-000?style=for-the-badge&logoColor=white) ![Styled-Components](https://img.shields.io/badge/styledcomponents-DB7093?style=flat-square&logo=styled-components&logoColor=white)


### Server

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MongoDB & Mongoose](https://img.shields.io/badge/MongoDB%20&%20Mongoose-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

### Test

![React Dom Testing](https://img.shields.io/badge/react%20dom%20testing-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Vitest](https://img.shields.io/badge/Vitest-%2344A833.svg?style=for-the-badge&logoColor=white)

### Deployment

![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7) ![AWS Elastic Beanstalk](https://img.shields.io/badge/AWS%20Elastic%20Beanstalk-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

<br>
<br>

# Schedule
### **프로젝트 기간: 2024.03.04(월) ~ 2024.03.27(수)**

<br>

**1 주차: 아이디어 선정, POC, 목업 및 DB스키마 설계**
- [노션 페이지 바로가기](https://yangwoocho.notion.site/UXPlorer-70fd0786b2784e59b0faf0051c6604cb?pvs=4)
<br>

**2 - 3주차: 클라이언트 구현 및 서버 구현**

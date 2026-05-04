import { useState, useEffect, useRef } from “react”;
import React from “react”;

// ─── 다국어 설정 ───────────────────────────────────────────────
const LOCALE = {
en: {
market: “Gumroad / Amazon KDP”,
link: “https://gumroad.com”,
suffix: “Reply in English. Use a warm, encouraging tone like a trusted coach. Ask only ONE question at a time if needed. Explain step by step. Use simple analogies instead of jargon. Keep it concise and easy to act on immediately.”,
ui: {
appName: “OneBigStep”,
sub: “In 7 days, you’ll have something real to share or sell.”,
topLabel: “🔥 Choose Your First Project”,
unlockedLabel: “🎁 Now Available”,
lockedLabel: “🔒 Unlock After Completing Previous”,
dayLabel: “Day”, timeLabel: “min”,
doneToday: “✅ Done — Keep Going”,
winBtn: “🏆 I Did It — Mark Complete”,
aiBtn: “🤖 Get My Next Step”,
aiPlaceholder: “Tell me a bit about yourself — job, hobby, or what you’d like to create…”,
copyBtn: “📋 Copy This”,
copiedBtn: “✅ Copied”,
retryBtn: “🔄 Try Again”,
linkBtn: “→ Open & Complete This Step”,
actionHint: “This step is yours to take. AI has done its part. Now it’s your turn. ✨”,
nextChallenge: “Start My Next Project”,
toHome: “← Back to Projects”,
winTitle: “You Built Something Real.”,
winSub: “In 7 days, you went from idea to something you can share or sell. That’s a real result.”,
unlockMsg: “🎁 New Project Unlocked”,
tooHard: “This feels like too much — break it into a smaller step”,
back: “← Back”,
winBankLabel: “🏅 What I’ve Built”,
progress: “Your Progress”,
thinking: “Preparing your next step…”,
inputHint: “Optional: fill in the [ ] to personalize your result”,
onlyOneTask: “Your one task for today”,
start: “Start Day 1”,
offlineMsg: “No internet connection. Please reconnect to continue.”,
}
},
ko: {
market: “크몽 / Gumroad”,
link: “https://kmong.com”,
suffix: “한국어로 답해줘. 40대 입문자가 편안함을 느낄 수 있도록 따뜻하고 친근한 말투로. 전문 용어 대신 일상적인 비유를 사용해줘. 질문은 한 번에 하나씩만. 단계별로 친절하게 설명하고, 바로 실행할 수 있게 짧고 명확하게.”,
ui: {
appName: “원빅스텝”,
sub: “7일 후, 공유하거나 판매할 수 있는 것이 생겨요.”,
topLabel: “🔥 첫 프로젝트 선택하기”,
unlockedLabel: “🎁 지금 시작 가능”,
lockedLabel: “🔒 이전 완료 후 열려요”,
dayLabel: “Day”, timeLabel: “분”,
doneToday: “✅ 완료 — 계속 가요”,
winBtn: “🏆 해냈어요 — 완료 표시”,
aiBtn: “🤖 다음 단계 알려줘”,
aiPlaceholder: “나에 대해 알려주세요 — 직업, 취미, 만들고 싶은 것…”,
copyBtn: “📋 복사하기”,
copiedBtn: “✅ 복사됨”,
retryBtn: “🔄 다시 받기”,
linkBtn: “→ 열고 이 단계 완료하기”,
actionHint: “이 단계는 당신이 직접 해야 해요. AI는 이미 준비를 다 했어요. ✨”,
nextChallenge: “다음 프로젝트 시작하기”,
toHome: “← 프로젝트 목록으로”,
winTitle: “진짜 결과물을 만들었어요.”,
winSub: “7일 만에 아이디어에서 공유하고 판매할 수 있는 것을 만들었어요. 진짜 성과예요.”,
unlockMsg: “🎁 새 프로젝트 해금”,
tooHard: “너무 많은 것 같아요 — 더 작은 단계로 나눌게요”,
back: “← 뒤로”,
winBankLabel: “🏅 내가 만든 것들”,
progress: “나의 진행률”,
thinking: “다음 단계를 준비하는 중…”,
inputHint: “선택: [ ] 를 채우면 더 맞춤화된 결과가 나와요”,
onlyOneTask: “오늘의 단 하나의 실행”,
start: “1일차 시작하기”,
offlineMsg: “인터넷 연결이 없어요. 다시 연결 후 계속해주세요.”,
}
},
zh: {
market: “小红书 / Gumroad”,
link: “https://gumroad.com”,
suffix: “用中文回答。用温暖友好的语气，像朋友一样交流。避免专业术语，多用生活化的比喻。一次只问一个问题。分步骤耐心解释，简洁明了，让人马上就能行动。”,
ui: {
appName: “第一大步”,
sub: “7天后，你将拥有可以分享或出售的真实成果。”,
topLabel: “🔥 选择你的第一个项目”,
unlockedLabel: “🎁 现在可以开始”,
lockedLabel: “🔒 完成前一个后解锁”,
dayLabel: “第”, timeLabel: “分钟”,
doneToday: “✅ 完成 — 继续前进”,
winBtn: “🏆 我做到了 — 标记完成”,
aiBtn: “🤖 告诉我下一步”,
aiPlaceholder: “告诉我一些关于你的信息 — 职业、爱好或想创作的内容…”,
copyBtn: “📋 复制”,
copiedBtn: “✅ 已复制”,
retryBtn: “🔄 重试”,
linkBtn: “→ 打开并完成此步骤”,
actionHint: “这一步由你来完成。AI已经做好了准备。现在轮到你了。✨”,
nextChallenge: “开始下一个项目”,
toHome: “← 返回项目列表”,
winTitle: “你创造了真实的成果。”,
winSub: “7天内，你从想法到创造出可以分享或出售的东西。这是真实的成就。”,
unlockMsg: “🎁 新项目已解锁”,
tooHard: “感觉太多了 — 拆分成更小的步骤”,
back: “← 返回”,
winBankLabel: “🏅 我创造的成果”,
progress: “我的进度”,
thinking: “正在准备你的下一步…”,
inputHint: “可选：填写 [ ] 以获得更个性化的结果”,
onlyOneTask: “今天唯一要做的事”,
start: “开始第一天”,
offlineMsg: “没有网络连接。请重新连接后继续。”,
}
}
};

// ─── 챌린지 데이터 ─────────────────────────────────────────────
const CHALLENGES = [
{
id: “ebook”, icon: “📚”, main: true,
title: { en: “AI E-book in 7 Days”, ko: “AI로 전자책 만들기”, zh: “7天AI电子书” },
tag: { en: “First Author”, ko: “첫 작가”, zh: “第一本书” },
tagline: { en: “Your 20yr experience = a book today.”, ko: “내 20년 경험이 오늘 책이 됩니다.”, zh: “你的经验值得一本书。” },
unlockMsg: { en: null, ko: null, zh: null },
days: [
{ day:1, task:{ en:“Find your e-book topic”, ko:“전자책 주제 정하기”, zh:“确定电子书主题” }, time:5, type:“ai”,
prompt:“I am a 40yo adult who wants to write a short 5-page e-book. My background: [INPUT]. Suggest 5 practical e-book topics I can sell on {MARKET}. Keep each suggestion to 1 line.” },
{ day:2, task:{ en:“Create table of contents”, ko:“목차 5개 만들기”, zh:“创建目录” }, time:5, type:“ai”,
prompt:“Create a 5-chapter table of contents for an e-book about [INPUT]. Each chapter should give readers practical takeaways. Keep it short.” },
{ day:3, task:{ en:“Write the core chapter”, ko:“핵심 챕터 내용 쓰기”, zh:“写核心章节” }, time:15, type:“ai”,
prompt:“Write the main chapter content for an e-book about [INPUT]. About 200 words. Warm, personal tone from a 40yo sharing real experience.” },
{ day:4, task:{ en:“Create a catchy title”, ko:“표지 제목 만들기”, zh:“创作吸引人的标题” }, time:5, type:“ai”,
prompt:“Create 5 catchy e-book titles and subtitles for a book about [INPUT]. Make them compelling so people want to buy it.” },
{ day:5, task:{ en:“Design cover on Canva”, ko:“캔바로 표지 만들기”, zh:“在Canva设计封面” }, time:15, type:“link”, link:“https://www.canva.com” },
{ day:6, task:{ en:“Write your sales description”, ko:“판매 소개글 쓰기”, zh:“撰写销售描述” }, time:5, type:“ai”,
prompt:“Write a 3-sentence product description for an e-book about [INPUT] to sell on {MARKET}. Make it compelling and trust-building.” },
{ day:7, task:{ en:“🏆 Publish & Sell!”, ko:“🏆 출판하고 판매!”, zh:“🏆 发布并销售!” }, time:5, type:“link”, link:”{MARKET_LINK}” },
]
},
{
id: “suno”, icon: “🎵”, main: true,
title: { en: “Make My Song with AI”, ko: “수노로 내 노래 만들기”, zh: “AI创作我的歌曲” },
tag: { en: “First Artist”, ko: “첫 아티스트”, zh: “第一首歌” },
tagline: { en: “No instrument needed. Your song in 7 days.”, ko: “악기 없이. 악보 없이. 내 이름의 노래.”, zh: “无需乐器，7天创作你的歌曲。” },
unlockMsg: { en: null, ko: null, zh: null },
days: [
{ day:1, task:{ en:“Sign up for Suno”, ko:“수노 가입하기”, zh:“注册Suno” }, time:3, type:“link”, link:“https://suno.com” },
{ day:2, task:{ en:“Find your music style”, ko:“내 스타일 장르 찾기”, zh:“找到你的音乐风格” }, time:5, type:“ai”,
prompt:“I’m a 40yo adult who wants to create my first AI song on Suno. My taste: [INPUT]. Suggest 3 music genres and moods that would suit me. One line each.” },
{ day:3, task:{ en:“Choose a lyrics theme”, ko:“가사 주제 정하기”, zh:“选择歌词主题” }, time:5, type:“ai”,
prompt:“Suggest 5 emotional song lyric themes for someone in their 40s. Based on: [INPUT]. Themes about life, gratitude, memory work well. One line each.” },
{ day:4, task:{ en:“Build Suno prompt”, ko:“수노 프롬프트 만들기”, zh:“创建Suno提示词” }, time:5, type:“ai”,
prompt:“Create 3 Suno.com English prompts for a song. Genre: [INPUT]. Include mood, style, language instructions. Ready to paste into Suno.” },
{ day:5, task:{ en:“Generate & pick your song”, ko:“곡 생성 & 선택하기”, zh:“生成并选择你的歌曲” }, time:10, type:“link”, link:“https://suno.com” },
{ day:6, task:{ en:“Name your YouTube channel”, ko:“유튜브 채널 이름 짓기”, zh:“为YouTube频道命名” }, time:5, type:“ai”,
prompt:“Suggest 5 YouTube channel names for a 40yo who makes AI music. Based on: [INPUT]. Memorable and emotional names.” },
{ day:7, task:{ en:“🏆 Upload to YouTube!”, ko:“🏆 유튜브 업로드!”, zh:“🏆 上传到YouTube!” }, time:5, type:“ai”,
prompt:“Write a YouTube video title, 3-line description, and 10 tags for an AI-generated [INPUT] music video. Make it searchable.” },
]
},
{
id: “youtube”, icon: “▶️”, main: true,
title: { en: “YouTube Shorts First Video”, ko: “유튜브 쇼츠 첫 영상”, zh: “YouTube Shorts首个视频” },
tag: { en: “First YouTuber”, ko: “첫 유튜버”, zh: “第一个视频” },
tagline: { en: “No face needed. Just your voice.”, ko: “얼굴 없이. 목소리만으로 시작하세요.”, zh: “不需要露脸，只需你的声音。” },
unlockMsg: { en: null, ko: null, zh: null },
days: [
{ day:1, task:{ en:“Create YouTube channel”, ko:“유튜브 채널 개설”, zh:“创建YouTube频道” }, time:5, type:“link”, link:“https://studio.youtube.com” },
{ day:2, task:{ en:“Find your channel concept”, ko:“채널 컨셉 정하기”, zh:“确定频道概念” }, time:5, type:“ai”,
prompt:“I’m a 40yo starting YouTube Shorts for the first time. About me: [INPUT]. Suggest 10 Shorts concepts I can do without showing my face or needing special skills. One line each.” },
{ day:3, task:{ en:“Write your first script”, ko:“첫 영상 스크립트 쓰기”, zh:“撰写第一个脚本” }, time:10, type:“ai”,
prompt:“Write a 60-second YouTube Shorts script about [INPUT]. Structure: intro / main / outro. Natural and friendly tone. Ready to read aloud.” },
{ day:4, task:{ en:“Get filming tips”, ko:“촬영 팁 받기”, zh:“获取拍摄技巧” }, time:5, type:“ai”,
prompt:“Give me 5 smartphone filming tips for YouTube Shorts. Cover lighting, angle, and audio. Super simple for a first-timer.” },
{ day:5, task:{ en:“Name your channel”, ko:“채널 이름 & 프로필 만들기”, zh:“为频道命名” }, time:5, type:“ai”,
prompt:“Suggest 5 YouTube channel names for a 40yo doing Shorts about [INPUT]. Memorable and searchable names.” },
{ day:6, task:{ en:“Write title & tags”, ko:“제목과 태그 만들기”, zh:“撰写标题和标签” }, time:5, type:“ai”,
prompt:“Write 5 YouTube Shorts titles and 15 tags for a video about [INPUT]. Optimize for views and search.” },
{ day:7, task:{ en:“🏆 First Upload!”, ko:“🏆 첫 업로드!”, zh:“🏆 第一次上传!” }, time:5, type:“link”, link:“https://studio.youtube.com” },
]
},
{
id: “blog”, icon: “✍️”, main: false,
title: { en: “My First Blog Post”, ko: “첫 블로그 글 올리기”, zh: “我的第一篇博客” },
tag: { en: “First Post”, ko: “첫 포스팅”, zh: “第一篇文章” },
tagline: { en: “Experience is content.”, ko: “경험이 콘텐츠가 되는 순간.”, zh: “经验就是内容。” },
unlockMsg: { en: “Complete 1st challenge to unlock”, ko: “첫 번째 챌린지 완료 후 열려요”, zh: “完成第一个挑战后解锁” },
days: [
{ day:1, task:{ en:“Create a blog”, ko:“블로그 개설”, zh:“创建博客” }, time:5, type:“link”, link:“https://blog.naver.com” },
{ day:2, task:{ en:“Pick your topic”, ko:“첫 글 주제 정하기”, zh:“选择主题” }, time:5, type:“ai”,
prompt:“Suggest 10 first blog post topics for a 40yo beginner. Based on: [INPUT]. Must be from personal experience, not expert knowledge.” },
{ day:3, task:{ en:“Outline your post”, ko:“글 구조 잡기”, zh:“制定文章结构” }, time:5, type:“ai”,
prompt:“Create a simple intro/body/conclusion outline for a blog post about [INPUT]. Friendly, honest tone from a 40yo perspective.” },
{ day:4, task:{ en:“Write the draft”, ko:“초안 작성하기”, zh:“撰写草稿” }, time:10, type:“ai”,
prompt:“Write a ~300 word blog post draft about [INPUT]. Warm, personal, relatable tone for readers in their 40s.” },
{ day:5, task:{ en:“Write a click-worthy title”, ko:“클릭 부르는 제목 만들기”, zh:“撰写吸引点击的标题” }, time:3, type:“ai”,
prompt:“Create 5 compelling blog post titles for a post about [INPUT]. Include numbers or questions. Make readers want to click.” },
{ day:6, task:{ en:“Pick one photo”, ko:“사진 1장 고르기”, zh:“选择一张照片” }, time:3, type:“action” },
{ day:7, task:{ en:“🏆 Publish!”, ko:“🏆 발행!”, zh:“🏆 发布!” }, time:2, type:“action” },
]
},
{
id: “emoticon”, icon: “😄”, main: false,
title: { en: “Kakao Emoticon Creator”, ko: “카카오 이모티콘 만들기”, zh: “Kakao表情包创作” },
tag: { en: “First Emoji Artist”, ko: “첫 이모티콘 작가”, zh: “第一个表情包” },
tagline: { en: “AI draws it. You just describe.”, ko: “그림 못 그려도 돼요. AI가 그려줘요.”, zh: “AI来画，你只需描述。” },
unlockMsg: { en: “Complete 2nd challenge to unlock”, ko: “두 번째 챌린지 완료 후 열려요”, zh: “完成第二个挑战后解锁” },
days: [
{ day:1, task:{ en:“Find character concept”, ko:“캐릭터 컨셉 정하기”, zh:“确定角色概念” }, time:5, type:“ai”,
prompt:“Suggest 10 Kakao emoticon character concepts that sell well. Based on: [INPUT]. Everyday situations, 40s humor. One line each.” },
{ day:2, task:{ en:“Create 24 phrases”, ko:“이모티콘 문구 24개 만들기”, zh:“创建24个短语” }, time:10, type:“ai”,
prompt:“Create 24 emoticon text phrases for a [INPUT] character. Everyday conversations, cute and relatable expressions.” },
{ day:3, task:{ en:“Create AI image prompts”, ko:“AI 이미지 프롬프트 만들기”, zh:“创建AI图像提示词” }, time:10, type:“ai”,
prompt:“Write 5 English DALL-E prompts for a [INPUT] character emoticon. Cute, simple style, white background, Kakao emoticon style.” },
{ day:4, task:{ en:“Generate character images”, ko:“캐릭터 이미지 생성”, zh:“生成角色图像” }, time:15, type:“link”, link:“https://chatgpt.com” },
{ day:5, task:{ en:“Check Kakao guidelines”, ko:“카카오 가이드 확인”, zh:“查看Kakao指南” }, time:5, type:“link”, link:“https://emoticonstudio.kakao.com” },
{ day:6, task:{ en:“Submission checklist”, ko:“제안서 준비 체크리스트”, zh:“提交准备清单” }, time:5, type:“ai”,
prompt:“List the key requirements to submit emoticons to Kakao Emoticon Studio. File format, size, count. Short and clear for a beginner.” },
{ day:7, task:{ en:“🏆 Submit to Kakao!”, ko:“🏆 카카오에 제안!”, zh:“🏆 提交给Kakao!” }, time:10, type:“link”, link:“https://emoticonstudio.kakao.com” },
]
},
{
id: “instagram”, icon: “📸”, main: false,
title: { en: “Instagram Reels First Post”, ko: “인스타그램 릴스 올리기”, zh: “Instagram Reels首发” },
tag: { en: “First Influencer”, ko: “첫 인플루언서”, zh: “第一个Reels” },
tagline: { en: “Daily life is content.”, ko: “일상이 콘텐츠가 되는 순간.”, zh: “日常生活就是内容。” },
unlockMsg: { en: “Complete 3rd challenge to unlock”, ko: “세 번째 챌린지 완료 후 열려요”, zh: “完成第三个挑战后解锁” },
days: [
{ day:1, task:{ en:“Create Instagram account”, ko:“인스타그램 계정 만들기”, zh:“创建Instagram账号” }, time:5, type:“link”, link:“https://instagram.com” },
{ day:2, task:{ en:“Find your concept”, ko:“계정 컨셉 정하기”, zh:“确定账号概念” }, time:5, type:“ai”,
prompt:“I’m a 40yo starting Instagram Reels. About me: [INPUT]. Suggest 10 Reels concepts I can start with zero followers. One line each.” },
{ day:3, task:{ en:“Write your profile bio”, ko:“프로필 소개글 쓰기”, zh:“撰写个人简介” }, time:5, type:“ai”,
prompt:“Write 5 Instagram profile bio options for a 40yo doing [INPUT] content. 2 lines max, include emoji, memorable.” },
{ day:4, task:{ en:“First Reels idea”, ko:“첫 릴스 아이디어 정하기”, zh:“确定第一个Reels创意” }, time:5, type:“ai”,
prompt:“Suggest 5 first Instagram Reels ideas for someone doing [INPUT]. 15-30 seconds, no editing skills needed.” },
{ day:5, task:{ en:“Get filming tips”, ko:“릴스 촬영 팁 받기”, zh:“获取拍摄技巧” }, time:5, type:“ai”,
prompt:“Give 5 tips for filming Instagram Reels on smartphone. Vertical video, lighting, background. Simple for a beginner.” },
{ day:6, task:{ en:“Write caption & hashtags”, ko:“캡션과 해시태그 쓰기”, zh:“撰写说明和标签” }, time:5, type:“ai”,
prompt:“Write an Instagram Reels caption and 20 hashtags for content about [INPUT]. Maximize reach and engagement.” },
{ day:7, task:{ en:“🏆 Post your first Reel!”, ko:“🏆 첫 릴스 업로드!”, zh:“🏆 发布第一个Reel!” }, time:3, type:“link”, link:“https://instagram.com” },
]
},
{
id: “logo”, icon: “🏪”, main: false,
title: { en: “Online Shop Logo & Brand”, ko: “온라인 상점 로고 만들기”, zh: “网店Logo设计” },
tag: { en: “First Boss”, ko: “첫 사장님”, zh: “第一个品牌” },
tagline: { en: “Brand name to logo in 1 minute.”, ko: “브랜드 이름부터 로고까지, 1분 만에.”, zh: “1分钟完成品牌名和Logo。” },
unlockMsg: { en: “Complete 4th challenge to unlock”, ko: “네 번째 챌린지 완료 후 열려요”, zh: “完成第四个挑战后解锁” },
days: [
{ day:1, task:{ en:“Choose your product category”, ko:“쇼핑몰 아이템 정하기”, zh:“选择产品类别” }, time:5, type:“ai”,
prompt:“Suggest 10 good online shop product categories for a 40yo beginner on {MARKET}. No inventory needed if possible. One line each.” },
{ day:2, task:{ en:“Generate 10 brand names”, ko:“브랜드 이름 10개 만들기”, zh:“生成10个品牌名” }, time:5, type:“ai”,
prompt:“Create 10 brand names for an online shop selling [INPUT]. Memorable, trustworthy. Mix Korean/English or Chinese/English.” },
{ day:3, task:{ en:“Logo concept”, ko:“로고 컨셉 잡기”, zh:“确定Logo概念” }, time:5, type:“ai”,
prompt:“Describe 3 logo concepts for brand [INPUT]. For Canva. Include color palette, font style, and overall feeling.” },
{ day:4, task:{ en:“Make logo on Canva”, ko:“캔바로 로고 만들기”, zh:“在Canva制作Logo” }, time:15, type:“link”, link:“https://www.canva.com” },
{ day:5, task:{ en:“Open your store”, ko:“스마트스토어 개설”, zh:“开设网店” }, time:10, type:“link”, link:“https://sell.smartstore.naver.com” },
{ day:6, task:{ en:“Write store description”, ko:“스토어 소개글 쓰기”, zh:“撰写店铺介绍” }, time:5, type:“ai”,
prompt:“Write a 3-4 sentence shop description for [INPUT] online store. Trust-building and compelling.” },
{ day:7, task:{ en:“🏆 Store is Open!”, ko:“🏆 스토어 오픈!”, zh:“🏆 开店啦!” }, time:5, type:“link”, link:“https://sell.smartstore.naver.com” },
]
},
{
id: “finance”, icon: “📈”, main: false,
title: { en: “AI Finance News Summary”, ko: “AI 경제뉴스 3줄 요약”, zh: “AI财经新闻摘要” },
tag: { en: “First Investor”, ko: “첫 재테크”, zh: “第一次投资” },
tagline: { en: “Complex news → ‘Buy or not?’ in 3 lines.”, ko: “복잡한 뉴스를 ‘살까 말까’ 수준으로.”, zh: “复杂新闻→3行告诉你买不买。” },
unlockMsg: { en: “Complete 5th challenge to unlock”, ko: “다섯 번째 챌린지 완료 후 열려요”, zh: “完成第五个挑战后解锁” },
days: [
{ day:1, task:{ en:“Find your investment focus”, ko:“관심 투자 분야 정하기”, zh:“确定投资方向” }, time:3, type:“ai”,
prompt:“Suggest 5 investment areas for a 40yo beginner based on: [INPUT]. Include pros/cons in one line each. Simple language.” },
{ day:2, task:{ en:“Today’s market summary”, ko:“오늘 경제뉴스 요약”, zh:“今日市场摘要” }, time:5, type:“ai”,
prompt:“Summarize today’s key economic news in 3 lines for a 40yo investing beginner. End with: ‘So what should I do?’ 1-line advice.” },
{ day:3, task:{ en:“Find your investor type”, ko:“내 투자 성향 파악”, zh:“了解你的投资类型” }, time:5, type:“ai”,
prompt:“Give me a 5-question investor personality quiz. After I answer, tell me my investor type. Based on: [INPUT].” },
{ day:4, task:{ en:“10 investing terms explained”, ko:“초보 투자 용어 10개”, zh:“10个投资术语解释” }, time:5, type:“ai”,
prompt:“Explain 10 must-know investing terms for a complete beginner. Use simple analogies a 10-year-old could understand.” },
{ day:5, task:{ en:“Start with $10”, ko:“소액 투자 시작 방법”, zh:“用10元开始投资” }, time:5, type:“ai”,
prompt:“How can a 40yo investing beginner start with a very small amount based on: [INPUT]? Recommend safe, beginner-friendly apps.” },
{ day:6, task:{ en:“Build your news routine”, ko:“나만의 뉴스 루틴 만들기”, zh:“建立你的新闻习惯” }, time:5, type:“ai”,
prompt:“Create a 10-minute morning finance routine for a 40yo beginner. What apps, what news, in what order. Simple and sustainable.” },
{ day:7, task:{ en:“🏆 Make your first investment!”, ko:“🏆 첫 소액 투자!”, zh:“🏆 第一笔投资!” }, time:10, type:“ai”,
prompt:“Compare 2 beginner-friendly investing apps for [INPUT] market. Which is better for a first-timer and why? Include how to open an account.” },
]
},
];

const UNLOCK_ORDER = [“ebook”,“suno”,“youtube”,“blog”,“emoticon”,“instagram”,“logo”,“finance”];

// ── 온라인 복구 토스트 ──────────────────────────────────────────
function OnlineToast({ lang, t }) {
const [show, setShow] = useState(false);
const prevOnline = useRef(true);

useEffect(() => {
const handler = () => {
if (!prevOnline.current) {
setShow(true);
setTimeout(() => setShow(false), 3000);
}
prevOnline.current = true;
};
const offHandler = () => { prevOnline.current = false; };
window.addEventListener(“online”, handler);
window.addEventListener(“offline”, offHandler);
return () => {
window.removeEventListener(“online”, handler);
window.removeEventListener(“offline”, offHandler);
};
}, []);

if (!show) return null;
return (
<div style={{ background:“rgba(100,255,150,.15)”, borderBottom:“1px solid rgba(100,255,150,.3)”, padding:“12px 20px”, textAlign:“center”, position:“sticky”, top:0, zIndex:100, backdropFilter:“blur(8px)”, animation:“fu .3s ease” }}>
<p style={{ fontSize:14, color:”#6fffaa”, fontFamily:”‘DM Sans’,sans-serif”, fontWeight:500 }}>
✅ {lang===“ko”?“인터넷에 다시 연결됐어요!”:lang===“en”?“Back online!”:“网络已恢复！”}
</p>
</div>
);
}

// ─── 메인 컴포넌트 ──────────────────────────────────────────────
export default function OneBigStep() {
const [lang, setLang] = useState(“en”);
const [screen, setScreen] = useState(“home”);
const [selectedId, setSelectedId] = useState(null);
const [currentDay, setCurrentDay] = useState(1);
const [completedDays, setCompletedDays] = useState({});
const [wins, setWins] = useState([]);
const [aiResp, setAiResp] = useState(””);
const [loading, setLoading] = useState(false);
const [copied, setCopied] = useState(false);
const [userInput, setUserInput] = useState(””);
const [newUnlock, setNewUnlock] = useState(null);
const [showLocked, setShowLocked] = useState(false);
const [dataLoaded, setDataLoaded] = useState(false);
const [isOffline, setIsOffline] = useState(!navigator.onLine);

// ── 오프라인 감지 ──
useEffect(() => {
const goOffline = () => setIsOffline(true);
const goOnline = () => setIsOffline(false);
window.addEventListener(“offline”, goOffline);
window.addEventListener(“online”, goOnline);
return () => {
window.removeEventListener(“offline”, goOffline);
window.removeEventListener(“online”, goOnline);
};
}, []);

// ── 데이터 불러오기 (앱 시작시) ──
useEffect(() => {
const load = async () => {
try {
const winsResult = await window.storage.get(“obs_wins”);
if (winsResult?.value) setWins(JSON.parse(winsResult.value));
} catch {}
try {
const daysResult = await window.storage.get(“obs_days”);
if (daysResult?.value) setCompletedDays(JSON.parse(daysResult.value));
} catch {}
try {
const langResult = await window.storage.get(“obs_lang”);
if (langResult?.value) setLang(langResult.value);
} catch {}
setDataLoaded(true);
};
load();
}, []);

// ── 데이터 저장하기 (변경시마다) ──
useEffect(() => {
if (!dataLoaded) return;
const save = async () => {
try { await window.storage.set(“obs_wins”, JSON.stringify(wins)); } catch {}
try { await window.storage.set(“obs_days”, JSON.stringify(completedDays)); } catch {}
};
save();
}, [wins, completedDays, dataLoaded]);

useEffect(() => {
if (!dataLoaded) return;
const saveLang = async () => {
try { await window.storage.set(“obs_lang”, lang); } catch {}
};
saveLang();
}, [lang, dataLoaded]);

// ── 로딩 중 화면 ──
if (!dataLoaded) return (
<div style={{ minHeight:“100vh”, background:”#0c0c14”, display:“flex”, alignItems:“center”, justifyContent:“center”, flexDirection:“column”, gap:16 }}>
<div style={{ width:32, height:32, border:“3px solid rgba(245,200,66,.2)”, borderTopColor:”#f5c842”, borderRadius:“50%”, animation:“spin .8s linear infinite” }}/>
<p style={{ color:“rgba(240,237,232,.4)”, fontSize:13, fontFamily:“sans-serif” }}>불러오는 중…</p>
<style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
</div>
);

const t = LOCALE[lang].ui;
const market = LOCALE[lang].market;
const marketLink = LOCALE[lang].link;
const suffix = LOCALE[lang].suffix;

const completedIds = new Set(wins.map(w => w.id));
const unlockedCount = completedIds.size;

const isUnlocked = (id) => {
const idx = UNLOCK_ORDER.indexOf(id);
if (idx < 3) return true;
return unlockedCount >= idx;
};

const challenge = CHALLENGES.find(c => c.id === selectedId);
const todayStep = challenge?.days[currentDay - 1];
const doneCount = Object.keys(completedDays).filter(k => k.startsWith(selectedId + “-”)).length;

const callAI = async (rawPrompt) => {
setLoading(true); setAiResp(””);

```
// 언어별 기본 입력값
const inputVal = userInput.trim() || (
  lang === "ko" ? "일반적인 40대 직장인" :
  lang === "zh" ? "普通40岁上班族" :
  "a typical 40yo professional"
);

// 언어별 프롬프트 앞부분 컨텍스트
const langContext = lang === "ko"
  ? "나는 40대 한국인이야. "
  : lang === "zh"
  ? "我是一位40岁的中国用户。"
  : "I am a 40yo adult looking to start something new. ";

// 언어별 포맷 지시
const formatGuide = lang === "ko"
  ? "\n\n답변 형식: 번호 목록으로, 각 항목은 1~2줄. 전문용어 없이 쉽게."
  : lang === "zh"
  ? "\n\n回答格式：编号列表，每项1-2行。避免专业术语，通俗易懂。"
  : "\n\nFormat: numbered list, 1-2 lines each. No jargon. Practical and actionable.";

const prompt = langContext
  + rawPrompt
    .replace(/\[INPUT\]/g, inputVal)
    .replace(/\{MARKET\}/g, market)
    .replace(/\{MARKET_LINK\}/g, marketLink)
  + formatGuide
  + "\n\n" + suffix;

try {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }]
    })
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (data.error) throw new Error(data.error.message || "API error");
  const text = data.content?.map(b => b.text || "").join("").trim();
  if (!text) throw new Error("Empty response");
  setAiResp(text);
} catch (err) {
  const msg = lang === "ko"
    ? "잠시 문제가 생겼어요. 다시 시도해주세요. 🙏"
    : lang === "zh"
    ? "出现了问题，请重试。🙏"
    : "Something went wrong. Please try again. 🙏";
  setAiResp(msg);
  console.error("AI error:", err);
}
setLoading(false);
```

};

const handleCopy = (txt) => {
navigator.clipboard.writeText(txt);
setCopied(true); setTimeout(() => setCopied(false), 2000);
};

const handleComplete = () => {
const key = `${selectedId}-${currentDay}`;
setCompletedDays(prev => ({ …prev, [key]: true }));
if (currentDay === 7) {
const w = { id: selectedId, title: challenge.title[lang], icon: challenge.icon, tag: challenge.tag[lang], date: new Date().toLocaleDateString() };
setWins(prev => […prev, w]);
const nextIdx = UNLOCK_ORDER.indexOf(selectedId) + 1;
if (nextIdx < UNLOCK_ORDER.length) {
const nc = CHALLENGES.find(c => c.id === UNLOCK_ORDER[nextIdx]);
if (nc) setNewUnlock(nc);
}
setScreen(“win”);
} else {
setCurrentDay(d => d + 1);
setAiResp(””); setUserInput(””);
}
};

const isDayDone = (day) => !!completedDays[`${selectedId}-${day}`];

const mainC = CHALLENGES.filter(c => c.main);
const extraUnlocked = CHALLENGES.filter(c => !c.main && isUnlocked(c.id));
const extraLocked = CHALLENGES.filter(c => !c.main && !isUnlocked(c.id));

// ── 스타일 상수 ──
const W = { minHeight:“100vh”, background:“linear-gradient(160deg,#0c0c14 0%,#111827 55%,#0d1117 100%)”, fontFamily:”‘DM Sans’,system-ui,sans-serif”, color:”#f0ede8” };
const IN = { maxWidth:460, margin:“0 auto”, padding:“40px 20px” };
const ty = { display:“inline-block”, padding:“3px 10px”, borderRadius:20, fontSize:11, background:“rgba(245,200,66,0.1)”, color:”#f5c842”, border:“1px solid rgba(245,200,66,0.22)” };
const tg = { display:“inline-block”, padding:“3px 10px”, borderRadius:20, fontSize:11, background:“rgba(100,255,150,0.08)”, color:”#6fffaa”, border:“1px solid rgba(100,255,150,0.18)” };
const tb = { display:“inline-block”, padding:“3px 10px”, borderRadius:20, fontSize:11, background:“rgba(100,200,255,0.08)”, color:”#7ec8ff”, border:“1px solid rgba(100,200,255,0.2)” };

const css = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;700&display=swap'); *{box-sizing:border-box;margin:0;padding:0} .fade{animation:fu .4s ease forwards} @keyframes fu{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}} @keyframes pop{0%{transform:scale(.3);opacity:0}65%{transform:scale(1.18)}100%{transform:scale(1);opacity:1}} .pop{animation:pop .6s ease forwards} @keyframes unlock{0%{transform:scale(.8) rotate(-4deg);opacity:0}70%{transform:scale(1.06) rotate(1deg)}100%{transform:scale(1) rotate(0);opacity:1}} .ul-anim{animation:unlock .7s ease forwards} .card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:18px;padding:20px} .cbtn{cursor:pointer;text-align:left;width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.09);border-radius:18px;padding:18px 20px;color:#f0ede8;transition:all .25s} .cbtn:hover{background:rgba(255,255,255,0.08);border-color:rgba(245,200,66,0.38);transform:translateY(-2px)} .cbtn.locked{background:rgba(255,255,255,0.015);border:1px dashed rgba(255,255,255,0.07);cursor:default;opacity:.55} .cbtn.unlocked-extra{border-color:rgba(100,255,150,0.2)} .btn-y{background:linear-gradient(135deg,#f5c842,#e8a020);color:#0a0a0f;border:none;border-radius:13px;padding:15px;font-size:16px;font-weight:700;cursor:pointer;width:100%;transition:all .2s} .btn-y:hover{transform:scale(1.02);box-shadow:0 8px 28px rgba(245,200,66,.3)} .btn-g{background:transparent;border:1px solid rgba(255,255,255,0.14);color:#f0ede8;border-radius:12px;padding:12px 20px;font-size:14px;cursor:pointer;width:100%;transition:all .2s} .btn-g:hover{border-color:rgba(245,200,66,.4);background:rgba(245,200,66,.05)} .lang-btn{background:transparent;border:1px solid rgba(245,200,66,.35);color:rgba(240,237,232,.5);border-radius:15px;padding:5px 12px;cursor:pointer;font-size:12px;transition:all .2s} .lang-btn.on{background:#f5c842;color:#0a0a0f;font-weight:700} .pbar{height:5px;background:rgba(255,255,255,.07);border-radius:3px;overflow:hidden} .pfill{height:100%;background:linear-gradient(90deg,#f5c842,#e8a020);border-radius:3px;transition:width .5s} .ai-box{background:rgba(245,200,66,.04);border:1px solid rgba(245,200,66,.14);border-radius:15px;padding:18px;margin-top:14px} textarea{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:11px;color:#f0ede8;font-family:'DM Sans',sans-serif;font-size:14px;padding:12px;width:100%;resize:none;outline:none;line-height:1.6} textarea:focus{border-color:rgba(245,200,66,.4)} @keyframes spin{to{transform:rotate(360deg)}} .spin{width:22px;height:22px;border:2px solid rgba(245,200,66,.2);border-top-color:#f5c842;border-radius:50%;animation:spin .8s linear infinite;display:inline-block} ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:2px}`;

return (
<div style={W}>
<style>{css}</style>

```
  {/* ── 오프라인 배너 — 네트워크 끊기면 상단 고정 표시 ── */}
  {isOffline && (
    <div style={{ background:"rgba(255,80,80,.18)", borderBottom:"1px solid rgba(255,80,80,.35)", padding:"12px 20px", textAlign:"center", position:"sticky", top:0, zIndex:100, backdropFilter:"blur(8px)" }}>
      <p style={{ fontSize:14, color:"#ff9090", fontFamily:"'DM Sans',sans-serif", fontWeight:500 }}>
        📡 {t.offlineMsg}
      </p>
    </div>
  )}

  {/* ── 온라인 복구 배너 (3초 후 자동 사라짐) ── */}
  {!isOffline && (
    <OnlineToast lang={lang} t={t} />
  )}

  {/* ── HOME ── */}
  {screen === "home" && (
    <div style={IN} className="fade">
      {/* Lang switcher */}
      <div style={{ display:"flex", gap:8, justifyContent:"flex-end", marginBottom:24 }}>
        {["en","ko","zh"].map(l => (
          <button key={l} className={`lang-btn ${lang===l?"on":""}`} onClick={()=>setLang(l)}>
            {l==="ko"?"한국어":l==="en"?"EN":"中文"}
          </button>
        ))}
      </div>

      {/* Hero */}
      <div style={{ textAlign:"center", marginBottom:36 }}>
        <div style={{ fontSize:48, marginBottom:14 }}>🏆</div>
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:34, fontWeight:900, background:"linear-gradient(135deg,#f5c842,#fff8e1)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", marginBottom:8 }}>{t.appName}</h1>
        <p style={{ color:"rgba(240,237,232,.65)", fontSize:15, letterSpacing:"0.02em", lineHeight:1.6 }}>{t.sub}</p>
      </div>

      <div className="card" style={{ textAlign:"center", marginBottom:28, padding:"26px 22px" }}>
        <p style={{ fontFamily:"'Playfair Display',serif", fontSize:18, lineHeight:1.9, marginBottom:18 }}>
          {lang==="ko"
            ? "충분히 오래 생각해왔어요.\n7일이면 시작하기에 충분해요."
            : lang==="en"
            ? "You've been thinking about it long enough.\nSeven days is enough to get you started."
            : "你已经想得够久了。\n七天，足以让你正式开始。"}
        </p>
        <div style={{ textAlign:"left", display:"inline-block", marginBottom:18 }}>
          {(lang==="ko"
            ? ["🎯  하루 한 가지. 작고 명확하게.", "🤖  AI가 방법을 알려줘요. 한 번에 한 걸음씩.", "📦  7일 후, 공유할 수 있는 것이 생겨요."]
            : lang==="en"
            ? ["🎯  One task a day. Small and clear.", "🤖  AI shows you how. You take it one step at a time.", "📦  In 7 days, you'll have something to share."]
            : ["🎯  每天一个任务，小而清晰。", "🤖  AI告诉你怎么做，一次一步。", "📦  7天后，你将有可以分享的成果。"]
          ).map((line, i) => (
            <p key={i} style={{ fontSize:14, color:"rgba(240,237,232,.65)", lineHeight:2, fontFamily:"'DM Sans',sans-serif" }}>{line}</p>
          ))}
        </div>
        <p style={{ fontSize:13, color:"rgba(240,237,232,.32)", lineHeight:1.8, fontStyle:"italic", borderTop:"1px solid rgba(255,255,255,.06)", paddingTop:14 }}>
          {lang==="ko"
            ? "막히면, 더 작게 쪼개드려요."
            : lang==="en"
            ? "If it feels stuck, we break it down further."
            : "如果感觉卡住了，我们会帮你进一步拆解。"}
        </p>
      </div>

      {/* 메인 3개 */}
      <p style={{ fontSize:11, color:"rgba(240,237,232,.26)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:12 }}>{t.topLabel}</p>
      <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:26 }}>
        {mainC.map(c => (
          <button key={c.id} className="cbtn" onClick={()=>{ setSelectedId(c.id); setCurrentDay(1); setAiResp(""); setUserInput(""); setScreen("challenge"); }}>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <span style={{ fontSize:28 }}>{c.icon}</span>
              <div style={{ flex:1 }}>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:15, fontWeight:700, marginBottom:3 }}>{c.title[lang]}</div>
                <div style={{ fontSize:12, color:"rgba(240,237,232,.35)", marginBottom:7 }}>{c.tagline[lang]}</div>
                <span style={ty}>{c.tag[lang]}</span>
              </div>
              <span style={{ color:"rgba(245,200,66,.4)", fontSize:20 }}>›</span>
            </div>
          </button>
        ))}
      </div>

      {/* 해금된 추가 챌린지 */}
      {extraUnlocked.length > 0 && (
        <div style={{ marginBottom:24 }}>
          <p style={{ fontSize:11, color:"rgba(100,255,150,.45)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:12 }}>{t.unlockedLabel}</p>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {extraUnlocked.map(c => (
              <button key={c.id} className="cbtn unlocked-extra" onClick={()=>{ setSelectedId(c.id); setCurrentDay(1); setAiResp(""); setUserInput(""); setScreen("challenge"); }}>
                <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                  <span style={{ fontSize:28 }}>{c.icon}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:"'Playfair Display',serif", fontSize:15, fontWeight:700, marginBottom:3 }}>{c.title[lang]}</div>
                    <div style={{ fontSize:12, color:"rgba(240,237,232,.35)", marginBottom:7 }}>{c.tagline[lang]}</div>
                    <span style={tg}>🔓 {lang==="ko"?"해금됨":lang==="en"?"Unlocked":"已解锁"}</span>
                  </div>
                  <span style={{ color:"rgba(100,255,150,.4)", fontSize:20 }}>›</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 잠긴 챌린지 */}
      {extraLocked.length > 0 && (
        <div style={{ marginBottom:24 }}>
          <button style={{ background:"none", border:"none", color:"rgba(240,237,232,.25)", fontSize:12, cursor:"pointer", marginBottom:12, display:"flex", alignItems:"center", gap:6 }} onClick={()=>setShowLocked(!showLocked)}>
            🔒 {t.lockedLabel} {extraLocked.length}{lang==="ko"?"개":""} {showLocked?(lang==="ko"?"숨기기":lang==="en"?"Hide":"隐藏"):(lang==="ko"?"보기":lang==="en"?"Show":"显示")}
          </button>
          {showLocked && (
            <div style={{ display:"flex", flexDirection:"column", gap:8 }} className="fade">
              {extraLocked.map(c => (
                <div key={c.id} className="cbtn locked">
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <span style={{ fontSize:24, filter:"grayscale(1)", opacity:.4 }}>{c.icon}</span>
                    <div>
                      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:14, fontWeight:700, opacity:.5, marginBottom:3 }}>{c.title[lang]}</div>
                      <div style={{ fontSize:11, color:"rgba(240,237,232,.22)" }}>🔒 {c.unlockMsg[lang]}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 승리 뱅크 */}
      {wins.length > 0 && (
        <div className="card">
          <p style={{ fontSize:11, color:"rgba(240,237,232,.26)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:10 }}>{t.winBankLabel}</p>
          {wins.map((w,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 0", borderTop:i>0?"1px solid rgba(255,255,255,.05)":"none" }}>
              <span>{w.icon}</span>
              <span style={{ fontSize:13, flex:1 }}>{w.title}</span>
              <span style={ty}>{w.tag}</span>
            </div>
          ))}
        </div>
      )}

      {/* Copyright Footer */}
      <div style={{ textAlign:"center", marginTop:40, paddingBottom:20 }}>
        <p style={{ fontSize:11, color:"rgba(240,237,232,.18)", letterSpacing:"0.05em" }}>
          © 2025 OneBigStep. All rights reserved.
        </p>
        <p style={{ fontSize:10, color:"rgba(240,237,232,.1)", marginTop:4 }}>
          Designed & Built by OneBigStep
        </p>
      </div>
    </div>
  )}

  {/* ── CHALLENGE OVERVIEW ── */}
  {screen==="challenge" && challenge && (
    <div style={IN} className="fade">
      <button onClick={()=>setScreen("home")} style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.14)", color:"#f0ede8", cursor:"pointer", fontSize:14, marginBottom:24, display:"flex", alignItems:"center", gap:6, borderRadius:10, padding:"8px 16px" }}>{t.back}</button>
      <div style={{ textAlign:"center", marginBottom:22 }}>
        <div style={{ fontSize:44, marginBottom:10 }}>{challenge.icon}</div>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, marginBottom:8 }}>{challenge.title[lang]}</h2>
        <span style={ty}>{challenge.tag[lang]}</span>
        <p style={{ color:"rgba(240,237,232,.28)", fontSize:12, marginTop:8 }}>7 {lang==="ko"?"일 × 평균 7분 = 첫 승리 🏆":lang==="en"?"days × 7 min = First Win 🏆":"天 × 7分钟 = 第一胜利 🏆"}</p>
      </div>
      <div className="card" style={{ marginBottom:16 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
          <span style={{ fontSize:13, color:"rgba(240,237,232,.32)" }}>{t.progress}</span>
          <span style={{ fontSize:13, color:"#f5c842", fontWeight:700 }}>{doneCount}/7</span>
        </div>
        {/* 격려 문구 */}
        <p style={{ fontSize:13, color:"rgba(245,200,66,.7)", marginBottom:10, lineHeight:1.6 }}>
          {doneCount === 0
            ? (lang==="ko"?"오늘 첫 걸음을 내딛어요! 🚀":lang==="en"?"Let's take the first step! 🚀":"迈出第一步！🚀")
            : doneCount === 7
            ? (lang==="ko"?"완주했어요! 당신은 해냈습니다! 🏆":lang==="en"?"You completed it! Amazing! 🏆":"你完成了！太棒了！🏆")
            : (lang==="ko"
                ? `총 7일 중 ${doneCount}일째 달리고 있어요! 💪`
                : lang==="en"
                ? `Day ${doneCount} of 7 — keep going! 💪`
                : `第${doneCount}天，共7天，继续加油！💪`)}
        </p>
        <div className="pbar"><div className="pfill" style={{ width:`${(doneCount/7)*100}%` }}/></div>
        <div style={{ display:"flex", justifyContent:"space-between", marginTop:14 }}>
          {challenge.days.map(d => (
            <div key={d.day} style={{ width:28, height:28, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700, background:isDayDone(d.day)?"linear-gradient(135deg,#f5c842,#e8a020)":d.day===currentDay?"rgba(245,200,66,.12)":"rgba(255,255,255,.05)", border:d.day===currentDay?"2px solid rgba(245,200,66,.5)":"2px solid transparent", color:isDayDone(d.day)?"#0a0a0f":d.day===currentDay?"#f5c842":"rgba(240,237,232,.2)" }}>
              {isDayDone(d.day)?"✓":d.day}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:18 }}>
        {challenge.days.map(d => (
          <div key={d.day} style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 14px", background:isDayDone(d.day)?"rgba(245,200,66,.03)":d.day===currentDay?"rgba(245,200,66,.07)":"rgba(255,255,255,.02)", borderRadius:10, border:d.day===currentDay?"1px solid rgba(245,200,66,.2)":"1px solid rgba(255,255,255,.04)" }}>
            <div style={{ width:22, height:22, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700, background:isDayDone(d.day)?"linear-gradient(135deg,#f5c842,#e8a020)":"rgba(255,255,255,.07)", color:isDayDone(d.day)?"#0a0a0f":"rgba(240,237,232,.25)" }}>{isDayDone(d.day)?"✓":d.day}</div>
            <span style={{ flex:1, fontSize:15, color:isDayDone(d.day)?"rgba(240,237,232,.25)":"#f0ede8", textDecoration:isDayDone(d.day)?"line-through":"none", lineHeight:1.6 }}>{d.task[lang]}</span>
            <span style={{ fontSize:12, color:"rgba(240,237,232,.2)" }}>{d.time}{t.timeLabel}</span>
          </div>
        ))}
      </div>
      <button className="btn-y" onClick={()=>setScreen("day")}>{currentDay===1?t.start:`${t.dayLabel} ${currentDay} →`}</button>
    </div>
  )}

  {/* ── DAY SCREEN ── */}
  {screen==="day" && challenge && todayStep && (
    <div style={IN} className="fade">
      <button onClick={()=>setScreen("challenge")} style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.14)", color:"#f0ede8", cursor:"pointer", fontSize:14, marginBottom:24, display:"flex", alignItems:"center", gap:6, borderRadius:10, padding:"8px 16px" }}>{t.back}</button>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:24 }}>
        <div style={{ background:"linear-gradient(135deg,#f5c842,#e8a020)", borderRadius:9, padding:"6px 14px" }}>
          <span style={{ fontSize:12, fontWeight:700, color:"#0a0a0f" }}>{t.dayLabel} {currentDay}</span>
        </div>
        <span style={{ fontSize:12, color:"rgba(240,237,232,.26)" }}>{todayStep.time}{t.timeLabel}</span>
      </div>

      <div className="card" style={{ marginBottom:16, padding:"22px" }}>
        <p style={{ fontSize:11, color:"rgba(240,237,232,.2)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:10 }}>{t.onlyOneTask}</p>
        <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, lineHeight:1.5, marginBottom:14 }}>{todayStep.task[lang]}</h2>
        {todayStep.type==="ai" && <span style={ty}>🪄 AI</span>}
        {todayStep.type==="link" && <span style={tb}>🔗 Link</span>}
        {todayStep.type==="action" && <span style={tg}>✋ Action</span>}
      </div>

      {/* AI 타입 */}
      {todayStep.type==="ai" && (
        <div style={{ marginBottom:16 }}>
          {!aiResp && !loading && (
            <div>
              {todayStep.prompt?.includes("[INPUT]") && (
                <div style={{ marginBottom:12 }}>
                  <p style={{ fontSize:14, color:"rgba(240,237,232,.35)", marginBottom:8, lineHeight:1.6 }}>{t.inputHint}</p>
                  <textarea rows={2} placeholder={t.aiPlaceholder} value={userInput} onChange={e=>setUserInput(e.target.value)} style={{ fontSize:16, lineHeight:1.7 }}/>
                </div>
              )}
              <button className="btn-y" onClick={()=>callAI(todayStep.prompt)}>{t.aiBtn}</button>
            </div>
          )}
          {loading && (
            <div style={{ textAlign:"center", padding:"36px 0" }}>
              <div className="spin" style={{ margin:"0 auto 12px" }}/>
              <p style={{ fontSize:14, color:"rgba(240,237,232,.28)" }}>{t.thinking}</p>
            </div>
          )}
          {aiResp && !loading && (
            <div className="ai-box fade">
              <p style={{ fontSize:11, color:"rgba(245,200,66,.5)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:12 }}>AI Coach</p>
              <p style={{ fontSize:16, lineHeight:1.9, color:"rgba(240,237,232,.85)", marginBottom:16, whiteSpace:"pre-wrap" }}>{aiResp}</p>
              <div style={{ display:"flex", gap:8 }}>
                <button className="btn-g" style={{ flex:1 }} onClick={()=>handleCopy(aiResp)}>{copied?t.copiedBtn:t.copyBtn}</button>
                <button className="btn-g" style={{ flex:1 }} onClick={()=>{setAiResp("");setUserInput("");}}>{t.retryBtn}</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 링크 타입 */}
      {todayStep.type==="link" && (
        <div style={{ marginBottom:16 }}>
          {/* 외부 링크 안내 카드 */}
          <div className="card" style={{ marginBottom:12, padding:"16px 18px", background:"rgba(245,200,66,.06)", border:"1px solid rgba(245,200,66,.2)" }}>
            <p style={{ fontSize:13, color:"rgba(245,200,66,.8)", marginBottom:6, fontWeight:600 }}>
              {lang==="ko"?"📌 잠깐! 이렇게 하세요:":lang==="en"?"📌 Quick guide:":"📌 操作指南："}
            </p>
            <p style={{ fontSize:13, color:"rgba(240,237,232,.6)", lineHeight:1.8 }}>
              {lang==="ko"
                ? "① 아래 버튼으로 외부 사이트 이동\n② 거기서 할 일 완료\n③ 이 앱으로 돌아와서 아래 '완료' 버튼 누르기"
                : lang==="en"
                ? "① Tap button below to open the site\n② Complete your task there\n③ Come back here and tap 'Done'"
                : "① 点击下方按钮前往外部网站\n② 在那里完成任务\n③ 返回此应用，点击'完成'按钮"}
            </p>
          </div>
          <a href={(todayStep.link || marketLink).replace(/\{MARKET_LINK\}/g, marketLink).replace(/\{MARKET\}/g, market)} target="_blank" rel="noreferrer" style={{ textDecoration:"none", display:"block" }}>
            <button className="btn-y">{t.linkBtn} ↗</button>
          </a>
        </div>
      )}

      {/* 액션 타입 */}
      {todayStep.type==="action" && (
        <div className="card" style={{ textAlign:"center", marginBottom:16, padding:"20px" }}>
          <p style={{ fontSize:14, color:"rgba(240,237,232,.4)", lineHeight:1.9 }}>{t.actionHint}</p>
        </div>
      )}

      <p style={{ textAlign:"center", fontSize:12, color:"rgba(240,237,232,.18)", marginBottom:12 }}>
        {currentDay===7?"🏁":`${7-currentDay} ${lang==="ko"?"단계 남았어요 💪":lang==="en"?"steps left 💪":"步剩余 💪"}`}
      </p>
      <button className="btn-y" style={{ marginBottom:10 }} onClick={handleComplete}>
        {currentDay===7?t.winBtn:t.doneToday}
      </button>
      <button style={{ background:"none", border:"none", color:"rgba(240,237,232,.16)", fontSize:12, cursor:"pointer", width:"100%", padding:8 }}>{t.tooHard}</button>
    </div>
  )}

  {/* ── WIN SCREEN ── */}
  {screen==="win" && (
    <div style={{ ...IN, textAlign:"center", paddingTop:56 }} className="fade">
      <div style={{ fontSize:80, marginBottom:18 }} className="pop">🏆</div>
      <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:36, fontWeight:900, background:"linear-gradient(135deg,#f5c842,#fff8e1)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", marginBottom:10 }}>{t.winTitle}</h1>
      <p style={{ fontSize:16, color:"rgba(240,237,232,.48)", marginBottom:8 }}>{challenge?.title[lang]}</p>
      <span style={ty}>{challenge?.tag[lang]} ✓</span>
      <p style={{ fontSize:14, color:"rgba(240,237,232,.28)", marginTop:10, marginBottom:28 }}>{t.winSub}</p>

      {/* 🎖 성취 카드 — 상장 디자인 */}
      <div style={{ background:"linear-gradient(135deg,rgba(245,200,66,.08),rgba(245,200,66,.03))", border:"1px solid rgba(245,200,66,.25)", borderRadius:20, padding:"28px 24px", marginBottom:24, textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:"linear-gradient(90deg,#f5c842,#e8a020,#f5c842)" }}/>
        <p style={{ fontSize:11, color:"rgba(245,200,66,.5)", letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:12 }}>
          {lang==="ko"?"🎖 성취 증명서":lang==="en"?"🎖 Certificate of Achievement":"🎖 成就证书"}
        </p>
        <div style={{ fontSize:40, marginBottom:8 }}>{challenge?.icon}</div>
        <p style={{ fontFamily:"'Playfair Display',serif", fontSize:18, fontWeight:700, marginBottom:6 }}>{challenge?.title[lang]}</p>
        <p style={{ fontSize:13, color:"rgba(240,237,232,.45)", marginBottom:12 }}>
          {lang==="ko"?"7일 챌린지 완주":lang==="en"?"7-Day Challenge Complete":"7天挑战完成"}
        </p>
        <p style={{ fontSize:12, color:"rgba(240,237,232,.25)" }}>{new Date().toLocaleDateString()}</p>
        <div style={{ marginTop:16, paddingTop:16, borderTop:"1px solid rgba(245,200,66,.12)" }}>
          <p style={{ fontSize:12, color:"rgba(245,200,66,.4)", letterSpacing:"0.05em" }}>© OneBigStep</p>
        </div>
      </div>

      {/* 공유 버튼 */}
      <button className="btn-g" style={{ marginBottom:10 }} onClick={()=>{
        const text = lang==="ko"
          ? `🏆 OneBigStep에서 "${challenge?.title[lang]}" 7일 챌린지를 완주했어요! #OneBigStep #첫승리`
          : lang==="en"
          ? `🏆 I just completed the "${challenge?.title[lang]}" 7-Day Challenge on OneBigStep! #OneBigStep #FirstWin`
          : `🏆 我在OneBigStep完成了"${challenge?.title[lang]}"7天挑战！#OneBigStep #第一次胜利`;
        if (navigator.share) {
          navigator.share({ text });
        } else {
          navigator.clipboard.writeText(text);
          alert(lang==="ko"?"클립보드에 복사됐어요! SNS에 붙여넣기 하세요 😊":lang==="en"?"Copied! Paste it on your SNS 😊":"已复制！粘贴到社交媒体 😊");
        }
      }}>
        {lang==="ko"?"📤 SNS에 공유하기":lang==="en"?"📤 Share on SNS":"📤 分享到社交媒体"}
      </button>

      {/* 새 챌린지 해금 */}
      {newUnlock && (
        <div style={{ background:"rgba(100,255,150,.05)", border:"1px solid rgba(100,255,150,.2)", borderRadius:18, padding:"20px", marginBottom:24, textAlign:"left" }} className="ul-anim">
          <p style={{ fontSize:11, color:"rgba(100,255,150,.55)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:10 }}>{t.unlockMsg}</p>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ fontSize:32 }}>{newUnlock.icon}</span>
            <div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:16, fontWeight:700, marginBottom:4 }}>{newUnlock.title[lang]}</div>
              <div style={{ fontSize:13, color:"rgba(240,237,232,.38)" }}>{newUnlock.tagline[lang]}</div>
            </div>
          </div>
        </div>
      )}

      <div className="card" style={{ textAlign:"left", marginBottom:24 }}>
        <p style={{ fontSize:11, color:"rgba(245,200,66,.55)", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:10 }}>🧠 Winner Effect</p>
        <p style={{ fontSize:15, color:"rgba(240,237,232,.45)", lineHeight:1.9 }}>
          {lang==="ko"?"작은 승리를 경험하면 뇌에서 도파민이 분비되어 다음 도전을 더 쉽게 시작할 수 있게 됩니다. 지금 이 순간 당신이 바뀌고 있어요.":lang==="en"?"When you experience a small win, dopamine is released in your brain, making it easier to start the next challenge. You are changing right now.":"当你经历小小的胜利时，大脑会释放多巴胺，让你更容易开始下一个挑战。你正在改变。"}
        </p>
      </div>

      <button className="btn-y" style={{ marginBottom:10 }} onClick={()=>{ setSelectedId(null); setCurrentDay(1); setCompletedDays({}); setAiResp(""); setNewUnlock(null); setScreen("home"); }}>{t.nextChallenge}</button>
      <button className="btn-g" onClick={()=>setScreen("home")}>{t.toHome}</button>
    </div>
  )}
</div>
```

);
}

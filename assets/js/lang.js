// VisaGo 다국어 데이터 (KO / VI)
const LANG = {
  ko: {
    // 헤더/히어로
    hero_eyebrow:  "한국 거주 베트남인을 위한",
    hero_title:    "비자 변경, 이제 쉽게!",
    hero_sub:      "단계별 가이드와 커뮤니티가 함께합니다",
    hero_cta:      "셀프 비자 변경 가이드 시작 ↓",

    // 가이드 섹션
    guide_title:       "비자 가이드",
    guide_tab_e9_e74:  "E-9 → E-7-4",
    guide_tab_f6_f5:   "F-6 → F-5",
    guide_tab_e9_renew:"E-9 갱신",
    guide_tab_faq:     "자주 묻는 질문",

    // 게시판
    board_title:       "커뮤니티 게시판",
    board_empty:       "아직 게시글이 없습니다. 첫 번째로 글을 남겨보세요!",
    board_tag_success: "성공후기",
    board_tag_question:"질문",
    board_tag_warning: "주의사항",

    // 글쓰기 모달
    write_modal_title:       "새 글 쓰기",
    write_tag_label:         "카테고리",
    write_author_placeholder:"닉네임",
    write_title_placeholder: "제목을 입력하세요",
    write_content_placeholder:"내용을 입력하세요",
    post_author_label:       "닉네임",
    post_title_label:        "제목",
    post_content_label:      "내용",
    submit:                  "등록하기",

    // 상세/댓글
    modal_close:         "닫기",
    comment_placeholder: "댓글을 남겨주세요...",
    comment_submit:      "등록",
    no_comments:         "아직 댓글이 없습니다.",

    // 푸터
    footer_copy: "© 2025 VisaGo. 베트남 비자 커뮤니티",
  },
  vi: {
    // 헤더/히어로
    hero_eyebrow:  "Dành cho người Việt tại Hàn Quốc",
    hero_title:    "Đổi Visa Dễ Dàng!",
    hero_sub:      "Hướng dẫn từng bước và cộng đồng hỗ trợ",
    hero_cta:      "Bắt Đầu Hướng Dẫn Đổi Visa ↓",

    // 가이드 섹션
    guide_title:       "Hướng Dẫn Visa",
    guide_tab_e9_e74:  "E-9 → E-7-4",
    guide_tab_f6_f5:   "F-6 → F-5",
    guide_tab_e9_renew:"Gia Hạn E-9",
    guide_tab_faq:     "Câu Hỏi Thường Gặp",

    // 게시판
    board_title:       "Bảng Tin Cộng Đồng",
    board_empty:       "Chưa có bài đăng. Hãy là người đầu tiên viết bài!",
    board_tag_success: "Thành công",
    board_tag_question:"Câu hỏi",
    board_tag_warning: "Lưu ý",

    // 글쓰기 모달
    write_modal_title:       "Viết bài mới",
    write_tag_label:         "Danh mục",
    write_author_placeholder:"Biệt danh",
    write_title_placeholder: "Nhập tiêu đề",
    write_content_placeholder:"Nhập nội dung",
    post_author_label:       "Biệt danh",
    post_title_label:        "Tiêu đề",
    post_content_label:      "Nội dung",
    submit:                  "Đăng bài",

    // 상세/댓글
    modal_close:         "Đóng",
    comment_placeholder: "Để lại bình luận...",
    comment_submit:      "Đăng",
    no_comments:         "Chưa có bình luận nào.",

    // 푸터
    footer_copy: "© 2025 VisaGo. Cộng đồng visa Việt Nam",
  }
};

// 현재 언어 (기본: 베트남어)
let currentLang = localStorage.getItem("visago_lang") || "vi";

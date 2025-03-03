export const WAZUH_MODULES = {
  general: {
    title: 'Sự kiện bảo mật',
    description:
      'Duyệt qua các cảnh báo bảo mật của bạn, xác định các vấn đề và mối đe dọa trong môi trường của bạn.'
  },
  fim: {
    title: 'Giám sát tính toàn vẹn',
    description:
      'Cảnh báo liên quan đến các thay đổi tệp, bao gồm quyền, nội dung, quyền sở hữu và thuộc tính.'
  },
  pm: {
    title: 'Giám sát chính sách',
    description:
      'Xác minh rằng hệ thống của bạn được cấu hình theo tiêu chuẩn chính sách bảo mật của bạn.'
  },
  vuls: {
    title: 'Lỗ hổng bảo mật',
    description:
      'Phát hiện những ứng dụng trong môi trường của bạn bị ảnh hưởng bởi các lỗ hổng bảo mật nổi tiếng.'
  },
  oscap: {
    title: 'OpenSCAP',
    description:
      'Đánh giá cấu hình và tự động hóa giám sát tuân thủ bằng các kiểm tra SCAP.'
  },
  audit: {
    title: 'Kiểm toán hệ thống',
    description:
      'Kiểm tra hành vi người dùng, giám sát thực thi lệnh và cảnh báo truy cập vào các tệp quan trọng.'
  },
  pci: {
    title: 'PCI DSS',
    description:
      'Tiêu chuẩn bảo mật toàn cầu cho các tổ chức xử lý, lưu trữ hoặc truyền tải dữ liệu chủ thẻ thanh toán.'
  },
  gdpr: {
    title: 'GDPR',
    description:
      'Quy định bảo vệ dữ liệu cá nhân chung (GDPR) thiết lập các hướng dẫn cho việc xử lý dữ liệu cá nhân.'
  },
  hipaa: {
    title: 'HIPAA',
    description:
      'Đạo luật Di động và Trách nhiệm của Bảo hiểm Y tế năm 1996 (HIPAA) cung cấp các quy định về quyền riêng tư và bảo mật dữ liệu để bảo vệ thông tin y tế.'
  },
  nist: {
    title: 'NIST 800-53',
    description:
      'Ấn phẩm đặc biệt 800-53 của Viện Tiêu chuẩn và Công nghệ Quốc gia (NIST 800-53) thiết lập các hướng dẫn cho các hệ thống thông tin liên bang.'
  },
  tsc: {
    title: 'TSC',
    description:
      'Tiêu chí Dịch vụ Đáng tin cậy cho Bảo mật, Khả dụng, Tính toàn vẹn xử lý, Bảo mật thông tin và Quyền riêng tư'
  },
  ciscat: {
    title: 'CIS-CAT',
    description:
      'Đánh giá cấu hình sử dụng bộ quét Center of Internet Security và kiểm tra SCAP.'
  },
  aws: {
    title: 'Amazon AWS',
    description:
      'Các sự kiện bảo mật liên quan đến dịch vụ Amazon AWS của bạn, được thu thập trực tiếp qua API của AWS.'
  },
  office: {
    title: 'Office 365',
    description:
      'Các sự kiện bảo mật liên quan đến dịch vụ Office 365 của bạn.'
  },
  gcp: {
    title: 'Google Cloud Platform',
    description:
      'Các sự kiện bảo mật liên quan đến dịch vụ Google Cloud Platform của bạn, được thu thập trực tiếp qua API của GCP.'
  },
  virustotal: {
    title: 'VirusTotal',
    description:
      'Cảnh báo phát sinh từ phân tích VirusTotal các tệp tin đáng ngờ thông qua tích hợp API của họ.'
  },
  mitre: {
    title: 'MITRE ATT&CK',
    description:
      'Các sự kiện bảo mật từ cơ sở tri thức về chiến thuật và kỹ thuật của đối thủ, dựa trên quan sát thực tế.'
  },
  syscollector: {
    title: 'Dữ liệu kiểm kê',
    description:
      'Các ứng dụng, cấu hình mạng, cổng mở và tiến trình đang chạy trên hệ thống được giám sát của bạn.'
  },
  stats: {
    title: 'Thống kê',
    description: 'Thống kê cho agent và logcollector'
  },
  configuration: {
    title: 'Cấu hình',
    description:
      'Kiểm tra cấu hình hiện tại của agent được áp dụng từ xa bởi nhóm của nó.'
  },
  osquery: {
    title: 'Osquery',
    description:
      'Osquery có thể được sử dụng để thể hiện hệ điều hành như một cơ sở dữ liệu quan hệ hiệu năng cao.'
  },
  sca: {
    title: 'Đánh giá cấu hình bảo mật',
    description: 'Quét tài sản của bạn như một phần của cuộc kiểm toán đánh giá cấu hình.'
  },
  docker: {
    title: 'Trình theo dõi Docker',
    description:
      'Giám sát và thu thập hoạt động từ các container Docker như sự kiện tạo, chạy, khởi động, dừng hoặc tạm dừng.'
  },
  github: {
    title: 'GitHub',
    description:
      'Giám sát các sự kiện từ nhật ký kiểm toán của các tổ chức GitHub của bạn.'
  },
  devTools: {
    title: 'Bảng điều khiển API',
    description: 'Kiểm tra các điểm cuối API của Wazuh.'
  },
  logtest: {
    title: 'Kiểm tra nhật ký của bạn',
    description: 'Kiểm tra nhật ký thử nghiệm quy tắc của bạn.'
  },
  testConfiguration: {
    title: 'Kiểm tra cấu hình của bạn',
    description: 'Kiểm tra cấu hình trước khi áp dụng chúng'
  }
};


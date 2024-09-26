{/* <===== Đây là nơi lưu trữ những hằng phía client =====>*/}

// Logo Header
export const logoClient = 'https://www.wallpaperflare.com/static/765/775/653/errors-minimalism-typography-x-wallpaper.jpg'     

// danh mục ở header
export const navigationCategory = [
    {id: 1,title: "Khoa học"},
    {id: 2,title: "Tin học"},
    {id: 3,title: "Phát triển"},
    {id: 4,title: "Tài chính & Kế toán"},
    {id: 5,title: "Kinh doanh"}
];


//Slider
//Image
export const sliderImg = './src/assets/images/client/HomePage/banner.jpg';


// img Register
export const bannerRegister = './src/assets/images/client/Register/banner-register.jpg';
export const google = './src/assets/images/client/Register/google.png';

// Login 
// Banner
export const bannerLogin = './src/assets/images/client/LoginPage/banner_login.jpg';
export const googleLogo = './src/assets/images/client/LoginPage/google_logo.png';
export const lockIcon = './src/assets/images/client/LoginPage/icon_lock.png';
export const userIcon = './src/assets/images/client/LoginPage/icon_user.png';

// Danh sách trang ẩn nav của header và ẩn footer
export const routeConfig = {
    hiddenNavRoutes: ['/history_payment','/purchased_course', '/course/details/:id', '/:id/purchased_course'],
    hiddenFooterRoutes: ['/history_payment','/purchased_course','/course/details/:id','/content_course'],
    hiddenFullHeaderRoutes: ['/content_course']
};

// 404 Not Found img
export const notFoundImg = './src/assets/images/client/NotFound/notfound.png';


// Logo teacher
export const logoTeacher = './src/assets/images/teacher/logo_teacher_white-removebg.png';

// image Error
export const logoImageError = './src/assets/images/imageError/imageError.png';

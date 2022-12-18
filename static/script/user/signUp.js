function phone_num_hyphen(target) {
    target.value = target.value
     .replace(/[^0-9]/g, '')
     .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
}

// 아이디 이메일 유효성 검사
function id_check() {
    var user_id = document.getElementById("form_signup").user_id.value;
    var id_check = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if (user_id == "" || id_check.test(user_id)==false) {
        axios({
            method: "post",
            url: "/idCheck",
            data: {user_id:"none"}
        })
        .then(function() {
            Swal.fire({
                icon: 'error',
                title: '이메일을 정확히 입력해 주세요!',
                text: "'@'를 포함하여 입력해 주세요.",
            });
        })
    } else if(id_check.test(user_id)) {
        axios({
            method: "post",
            url:"/idCheck",
            data: {user_id: user_id}
        })
        .then(function(res) {
            if (res.data) {
                Swal.fire({
                    icon: 'success',
                    title: '사용 가능한 이메일 입니다.',
                });
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: '중복된 이메일 입니다!',
                    text: "다른 이메일을 사용해 주세요.",
                });
            }
        })
    }
}

// 회원가입
function signup() {
    var form = document.getElementById("form_signup");
    var id_check = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    var pw_check = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
    var name_check = /^[a-zA-Z가-힣]{2,10}$/;
    var phone_check = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    if (id_check.test(form.user_id.value)==false || form.user_id.value=="") {
        axios({
            method: "patch",
            url: "/signupUpdate",
            data: {false: "none"}
        })
        .then(function(res) {
            if (res.data) {
                Swal.fire({
                    icon: 'error',
                    title: '이메일을 정확히 입력해 주세요!',
                    text: '"@"를 포함하여 입력해 주세요.',
                });
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: '중복된 이메일 입니다!',
                    text: '다른 이메일을 사용해 주세요.',
                });
            }
        })
    } else if(pw_check.test(form.user_pw.value)==false || form.user_pw.value=="") {
        axios({
            method: "patch",
            url: "/signupUpdate",
            data: {false: "none"}
        })
        .then(function(res) {
            Swal.fire({
                icon: 'error',
                title: '비밀번호를 정확히 입력해 주세요!',
                text: '영문+숫자+특수문자 조합으로 8~16글자로 작성해 주세요.',
            });
        })
    } else if(form.user_pw.value!==form.user_pw_check.value) {
        axios({
            method: "post",
            url: "/pwCheck"
        })
        .then(function() {
            Swal.fire({
                icon: 'warning',
                title: '비밀번호가 일치하지 않습니다!',
                text: '비밀번호를 다시 입력해 주세요.',
            });
        })
    } else if(name_check.test(form.user_name.value)==false || form.user_name.value=="") {
        axios({
            method: "patch",
            url: "/signupUpdate",
            data: {false: "none"}
        })
        .then(function(res) {
            Swal.fire({
                icon: 'error',
                title: '이름을 정확히 입력해 주세요!',
                text: "빈칸 불가, 두 글자 이상으로 작성해 주세요."
            });
        })
    } else if(phone_check.test(form.user_phone.value)==false || form.user_phone.value=="") {
        axios({
            method: "patch",
            url: "/signupUpdate",
            data: {false: "none"}
        })
        .then(function(res) {
            Swal.fire({
                icon: 'error',
                title: '핸드폰 번호를 정확히 입력해 주세요!',
                text: '10~11글자, 숫자만 입력해 주세요.'
            });
        })
    } else {
        axios({
            method: "patch",
            url: "/signupUpdate",
            data: {
                user_id: form.user_id.value,
                user_pw: form.user_pw.value,
                user_name: form.user_name.value,
                user_phone: form.user_phone.value.replace(/-/g, '')
            }
        })
        .then(async function(res) {
            if (res.data) {
                await Swal.fire({
                    icon: 'success',
                    title: '회원가입을 완료했습니다!',
                    text: '버튼을 누르면 메인페이지로 이동합니다.'
                });
                location.href="/signIn";
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: '중복된 이메일 입니다!',
                    text: '다른 이메일을 사용해 주세요.'
                });
                
            }
        })
    }
}
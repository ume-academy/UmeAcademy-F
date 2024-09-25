import { z } from "zod";

const authValidation = z.object({
    fullname: z.string({message: 'Không được bỏ trống!'})
                .min(4, {message: 'Tên hiển thị ít nhất phải có từ 4 ký tự trở lên!'})
                .max(32, {message: 'Tên hiển thị không được phép vượt quá 32 ký tự!'}),

    email: z.string({message: 'Không được bỏ trống!'})
            .max(64, {message: 'Email không được phép vượt quá 64 ký tự!'})
            .email({message: 'Email không hợp lệ'}),

    password: z.string({message: 'Không được bỏ trống!'})
                .min(8, {message: 'Mật khẩu ít nhất phải có từ 8 ký tự trở lên!'})
                .max(32, {message: 'Mật khẩu không được phép vượt quá 32 ký tự!'}),
})

export default authValidation
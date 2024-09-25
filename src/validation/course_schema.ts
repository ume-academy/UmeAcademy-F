import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; //Tối đa 10MB
const ACCEPTED_FILE_TYPE = [".png", ".jpeg", ".jpg", ".gif"];

const course_schema = z.object({
  _method: z.string().optional(),
  title: z
    .string({ message: "*Tên là bắt buộc" })
    .min(4, { message: "*Tối thiểu 4 ký tự " })
    .max(64, { message: "*Tối đa 64 ký tự" }),

  description: z
    .string({ message: "*Mô tả là bắt buộc" })
    .min(6, { message: "*Tối thiểu 6 ký tự" })
    .max(1000, { message: "*Không được vượt quá 1000 ký tự" }),

  thumbnail: z
    .custom((file) => !!file, { message: "*Ảnh là bắt buộc" })
    .refine(
      (file: any) => {
        if (file instanceof File) {
          return file.size <= MAX_FILE_SIZE;
        }
        return true; // Nếu không phải là file (ví dụ: URL) thì không kiểm tra kích thước
      },
      {
        message: "*Kích thước tệp phải nhỏ hơn hoặc bằng 10MB",
      }
    )
    .refine(
      (file: any) => {
        if (file instanceof File) {
          const extension = file.name
            .slice(file.name.lastIndexOf("."))
            .toLowerCase();
          return ACCEPTED_FILE_TYPE.includes(extension);
        }
        return true; // Không kiểm tra định dạng nếu là URL
      },
      {
        message: "*Chỉ chấp nhận các định dạng tệp .png, .jpeg, .jpg, .gif",
      }
    ),

  old_price: z
    .number({ required_error: "*Giá tiền là bắt buộc" })
    .min(1, { message: "*Giá tiền phải lớn hơn 0" }), // Kiểm tra giá phải lớn hơn 0
  category_id: z.number({ required_error: "*Danh mục là bắt buộc" }),

  level_id: z.number().optional(),

  language_id: z.number().optional(),

  status: z.number({ required_error: "*Trạng thái là bắt buộc" }),
  
  user_id: z.number().optional(),
});

export default course_schema;

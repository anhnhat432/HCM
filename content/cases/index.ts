import type { ThoughtCase } from "@/types/thought-case";
import { ThoughtCaseSchema } from "@/schemas/case.schema";

import nhomGioiNhungKhongHopTac from "./nhom-gioi-nhung-khong-hop-tac.json";
import motNguoiGanhHetCongViec from "./mot-nguoi-ganh-het-cong-viec.json";
import batDongKhiChayDeadline from "./bat-dong-khi-chay-deadline.json";
import thanhVienYeuBiBoLai from "./thanh-vien-yeu-bi-bo-lai.json";
import chiaCongKhongCongBang from "./chia-cong-khong-cong-bang.json";
import nguoiLanhDaoKhongNhanLoi from "./nguoi-lanh-dao-khong-nhan-loi.json";
import quyetDinhDeLamNhungSai from "./quyet-dinh-de-lam-nhung-sai.json";
import thanhTichCuaNhomCongCuaAi from "./thanh-tich-cua-nhom-cong-cua-ai.json";
import noiThatKhiKhongAiBiet from "./noi-that-khi-khong-ai-biet.json";
import kyLuatVaLongTin from "./ky-luat-va-long-tin.json";
import loiIchCaNhanVaTapThe from "./loi-ich-ca-nhan-va-tap-the.json";
import uuTienNguoiQuen from "./uu-tien-nguoi-quen.json";
import chiaSeTaiNguyenKhanHiem from "./chia-se-tai-nguyen-khan-hiem.json";
import thoaHiepDenDau from "./thoa-hiep-den-dau.json";
import imLangTruocSaiPham from "./im-lang-truoc-sai-pham.json";
import damDongDangCongKichMotNguoi from "./dam-dong-dang-cong-kich-mot-nguoi.json";
import tinChuaKiemChung from "./tin-chua-kiem-chung.json";
import batDongTrenMang from "./bat-dong-tren-mang.json";
import thanhTichVaHinhAnhCaNhan from "./thanh-tich-va-hinh-anh-ca-nhan.json";
import noiDungGayChiaRe from "./noi-dung-gay-chia-re.json";
import diemSoCoDinhNghiaConNguoi from "./diem-so-co-dinh-nghia-con-nguoi.json";
import nguoiChamTienBo from "./nguoi-cham-tien-bo.json";
import coHoiThuHai from "./co-hoi-thu-hai.json";
import apLucNangSuat from "./ap-luc-nang-suat.json";
import giaoDucViThanhTich from "./giao-duc-vi-thanh-tich.json";
import khacBietTheHe from "./khac-biet-the-he.json";
import nguoiMoiTrongCongDong from "./nguoi-moi-trong-cong-dong.json";
import mucTieuChungKhiLoiIchKhacNhau from "./muc-tieu-chung-khi-loi-ich-khac-nhau.json";
import phatTrienNhungBoQuenConNguoi from "./phat-trien-nhung-bo-quen-con-nguoi.json";
import trachNhiemTruocVanDeChung from "./trach-nhiem-truoc-van-de-chung.json";

const rawCases = [
  nhomGioiNhungKhongHopTac,
  motNguoiGanhHetCongViec,
  batDongKhiChayDeadline,
  thanhVienYeuBiBoLai,
  chiaCongKhongCongBang,
  nguoiLanhDaoKhongNhanLoi,
  quyetDinhDeLamNhungSai,
  thanhTichCuaNhomCongCuaAi,
  noiThatKhiKhongAiBiet,
  kyLuatVaLongTin,
  loiIchCaNhanVaTapThe,
  uuTienNguoiQuen,
  chiaSeTaiNguyenKhanHiem,
  thoaHiepDenDau,
  imLangTruocSaiPham,
  damDongDangCongKichMotNguoi,
  tinChuaKiemChung,
  batDongTrenMang,
  thanhTichVaHinhAnhCaNhan,
  noiDungGayChiaRe,
  diemSoCoDinhNghiaConNguoi,
  nguoiChamTienBo,
  coHoiThuHai,
  apLucNangSuat,
  giaoDucViThanhTich,
  khacBietTheHe,
  nguoiMoiTrongCongDong,
  mucTieuChungKhiLoiIchKhacNhau,
  phatTrienNhungBoQuenConNguoi,
  trachNhiemTruocVanDeChung,
];

export const thoughtCases: readonly ThoughtCase[] = rawCases.map((rawCase) => {
  return ThoughtCaseSchema.parse(rawCase) as unknown as ThoughtCase;
});

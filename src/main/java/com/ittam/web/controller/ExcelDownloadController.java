package com.ittam.web.controller;

import com.ittam.web.asset_request.service.AssetRequestService;
import com.ittam.web.command.ITAssetsVO;
import com.ittam.web.command.UserVO;
import com.ittam.web.user.service.UserService;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.util.List;

@Controller
@RequestMapping("/excelDownload")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ExcelDownloadController {

    @Autowired
    UserService userService;

    @Autowired
    AssetRequestService assetRequestService;

    @GetMapping("/excelDownload.do")
    public ResponseEntity<byte[]> excelDownload(@RequestParam("page") String page, HttpServletResponse response) throws Exception {

        ByteArrayOutputStream outputStream;

        try {

            switch (page) {
                // 들어오는 page 에 따라서 엑셀 파일 생성하는 메서드를 다르게 설정
                case "userList":
                    outputStream = generateUserExcel(response);
                    break;
                case "assetAllList":
                   outputStream = generateAssetsAll(response);
                   break;
                case "assetPCList":
                    outputStream = generatePcAll(response);
                    break;
                case "serverList":
                    outputStream = generateServerAll(response);
                    break;
                case "softwareList":
                    outputStream = generateSoftwareAll(response);
                    break;
                case "etcList" :
                    outputStream = generateEtcAll(response);
                    break;
                default:
                    throw new Exception("Invalid page");
            }

            // 리액트는 2진수 byte 로 내보내야 함
            byte[] bytes = outputStream.toByteArray();

            // 들어온 page 명으로 보냄
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDisposition(ContentDisposition.builder("attachment")
                    .filename(page + ".xlsx")
                    .build());

            return new ResponseEntity<>(bytes, headers, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

    // 엑셀 스타일 설정
    private XSSFCellStyle createHeaderStyle(XSSFWorkbook workbook) {
        XSSFFont headerXSSFFont = workbook.createFont();
        headerXSSFFont.setColor(new XSSFColor(new byte[]{(byte) 255, (byte) 255, (byte) 255}));

        XSSFCellStyle headerXssfCellStyle = workbook.createCellStyle();
        headerXssfCellStyle.setBorderLeft(BorderStyle.THIN);
        headerXssfCellStyle.setBorderRight(BorderStyle.THIN);
        headerXssfCellStyle.setBorderTop(BorderStyle.THIN);
        headerXssfCellStyle.setBorderBottom(BorderStyle.THIN);
        headerXssfCellStyle.setFillForegroundColor(new XSSFColor(new byte[]{(byte) 34, (byte) 37, (byte) 41}));
        headerXssfCellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        headerXssfCellStyle.setFont(headerXSSFFont);

        return headerXssfCellStyle;
    }

    private XSSFCellStyle createBodyStyle(XSSFWorkbook workbook) {
        XSSFCellStyle bodyXssfCellStyle = workbook.createCellStyle();
        bodyXssfCellStyle.setBorderLeft(BorderStyle.THIN);
        bodyXssfCellStyle.setBorderRight(BorderStyle.THIN);
        bodyXssfCellStyle.setBorderTop(BorderStyle.THIN);
        bodyXssfCellStyle.setBorderBottom(BorderStyle.THIN);

        return bodyXssfCellStyle;
    }

    // 한글 길이를 비교하기 위한 메서드
    private int getApproximateWidth(String value) {
        int length = 0;
        for (char c : value.toCharArray()) {
            if (c < 128) {
                length += 1;
            } else {
                length += 2;
            }
        }
        return length;
    }

    private ByteArrayOutputStream generateUserExcel(HttpServletResponse res) throws Exception {
        XSSFWorkbook workbook = new XSSFWorkbook();

        XSSFSheet sheet = workbook.createSheet("User List"); // 시트 이름

        String[] headers = {"사원 번호", "성명", "Email", "부서", "연락처", "주소", "입사일", "년차"};
        int[] maxLengths = new int[headers.length]; // 가장 긴 값으로 셀의 크기를 설정하기 위한 배열

        // 헤더의 길이로 셀 너비 설정
        for (int i = 0; i < headers.length; i++) {
            maxLengths[i] = headers[i].length();
        }

        // 각 스타일을 설정한다
        XSSFCellStyle headerStyle = createHeaderStyle(workbook);
        XSSFCellStyle bodyStyle = createBodyStyle(workbook);

        // 엑셀의 헤더 배열을 이용해서 엑셀의 셀 위쪽을 설정
        Row headerRow = sheet.createRow(0);
        for (int i = 0; i < headers.length; i++) {
            Cell headerCell = headerRow.createCell(i);
            headerCell.setCellValue(headers[i]);
            headerCell.setCellStyle(headerStyle); // 헤더 스타일
        }

        int employeeNumberMinWidth = "DV11111111111".length(); // 사원 번호 길이 설정 ( 아무리 해도 안되서 기본 길이 넣음 )

        // 데이터 뿌리기
        List<UserVO> users = userService.userList();
        for (int i = 0; i < users.size(); i++) {
            Row row = sheet.createRow(i + 1);

            LocalDate joinDate = users.get(i).getUser_joindate();
            LocalDate currentDate = LocalDate.now();

            // 년차를 계산
            int yearDifference = currentDate.getYear() - joinDate.getYear() == 0 ? 1 : currentDate.getYear() - joinDate.getYear() + 1;

            String[] values = {
                    users.get(i).getUsername(),
                    users.get(i).getUser_name(),
                    users.get(i).getUser_email(),
                    users.get(i).getUser_depart(),
                    users.get(i).getUser_phone(),
                    users.get(i).getUser_address(),
                    users.get(i).getUser_joindate().toString()
            };

            // 각 셀에 값을 넣고, 너비도 설정
            for (int j = 0; j < values.length; j++) {
                row.createCell(j).setCellValue(values[j]);
                row.getCell(j).setCellStyle(bodyStyle);
                maxLengths[j] = Math.max(maxLengths[j], getApproximateWidth(values[j]));
            }

            // 년차 셀 너비 설정
            Cell yearCell = row.createCell(values.length);
            yearCell.setCellValue(yearDifference);
            yearCell.setCellStyle(bodyStyle);

            // 사원 번호 셀 너비 설정
            maxLengths[0] = Math.max(maxLengths[0], employeeNumberMinWidth);
        }


        // 셀 너비를 설정
        for (int i = 0; i < headers.length; i++) {
            sheet.setColumnWidth(i, maxLengths[i] * 256);
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();

        return outputStream;

    }

    // 이 아래에 각 페이지에서 다운 로드할 엑셀 파일 설정을 넣는다
    private ByteArrayOutputStream generateApproveExcel(HttpServletResponse res) throws Exception {


        return null;
    }
    
    // 전체 자산
    private ByteArrayOutputStream generateAssetsAll(HttpServletResponse res) throws Exception {
        XSSFWorkbook workbook = new XSSFWorkbook();

        XSSFSheet sheet = workbook.createSheet("Assets All List"); // 시트 이름

        String[] headers = {"자산 번호", "자산명", "자산 상세 명", "자산 상태", "자산 스펙", "추가일"};
        int[] maxLengths = new int[headers.length]; // 가장 긴 값으로 셀의 크기를 설정하기 위한 배열

        // 헤더의 길이로 셀 너비 설정g
        for (int i = 0; i < headers.length; i++) {
            maxLengths[i] = headers[i].length();
        }

        // 각 스타일을 설정한다
        XSSFCellStyle headerStyle = createHeaderStyle(workbook);
        XSSFCellStyle bodyStyle = createBodyStyle(workbook);

        // 엑셀의 헤더 배열을 이용해서 엑셀의 셀 위쪽을 설정
        Row headerRow = sheet.createRow(0);
        for (int i = 0; i < headers.length; i++) {
            Cell headerCell = headerRow.createCell(i);
            headerCell.setCellValue(headers[i]);
            headerCell.setCellStyle(headerStyle); // 헤더 스타일
        }


        // 데이터 뿌리기
        List<ITAssetsVO> itAssets = assetRequestService.AssetAllList();
        for (int i = 0; i < itAssets.size(); i++) {
            Row row = sheet.createRow(i + 1);

            // 년차를 계산

            String[] values = {
                    String.valueOf(itAssets.get(i).getAssets_num()),
                    itAssets.get(i).getAssets_name(),
                    itAssets.get(i).getAssets_detail_name(),
                    itAssets.get(i).getAssets_status(),
                    String.valueOf(itAssets.get(i).getSpec_num()),
                    itAssets.get(i).getAdd_date().toString().substring(0, 10)
            };

            // 각 셀에 값을 넣고, 너비도 설정
            for (int j = 0; j < values.length; j++) {
                row.createCell(j).setCellValue(values[j]);
                row.getCell(j).setCellStyle(bodyStyle);
                maxLengths[j] = Math.max(maxLengths[j], getApproximateWidth(values[j]));
            }


        }


        // 셀 너비를 설정
        for (int i = 0; i < headers.length; i++) {
            sheet.setColumnWidth(i, maxLengths[i] * 256);
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();

        return outputStream;

    }
    
    // pc 리스트
    private ByteArrayOutputStream generatePcAll(HttpServletResponse res) throws Exception {
        XSSFWorkbook workbook = new XSSFWorkbook();

        XSSFSheet sheet = workbook.createSheet("Assets PC List"); // 시트 이름

        String[] headers = {"자산 번호", "자산명", "제조사", "자산 상태", "시리얼", "보증기간"};
        int[] maxLengths = new int[headers.length]; // 가장 긴 값으로 셀의 크기를 설정하기 위한 배열

        // 헤더의 길이로 셀 너비 설정g
        for (int i = 0; i < headers.length; i++) {
            maxLengths[i] = headers[i].length();
        }

        // 각 스타일을 설정한다
        XSSFCellStyle headerStyle = createHeaderStyle(workbook);
        XSSFCellStyle bodyStyle = createBodyStyle(workbook);

        // 엑셀의 헤더 배열을 이용해서 엑셀의 셀 위쪽을 설정
        Row headerRow = sheet.createRow(0);
        for (int i = 0; i < headers.length; i++) {
            Cell headerCell = headerRow.createCell(i);
            headerCell.setCellValue(headers[i]);
            headerCell.setCellStyle(headerStyle); // 헤더 스타일
        }


        // 데이터 뿌리기
        List<ITAssetsVO> itAssets = assetRequestService.AssetRequestListPC();
        for (int i = 0; i < itAssets.size(); i++) {
            Row row = sheet.createRow(i + 1);

            // 년차를 계산

            String[] values = {
                    String.valueOf(itAssets.get(i).getAssets_num()),
                    itAssets.get(i).getAssets_name(),
                    itAssets.get(i).getSpec_mfg(),
                    itAssets.get(i).getAssets_status(),
                    itAssets.get(i).getSpec_seriel(),
                    itAssets.get(i).getSpec_warranty(),
            };

            // 각 셀에 값을 넣고, 너비도 설정
            for (int j = 0; j < values.length; j++) {
                row.createCell(j).setCellValue(values[j]);
                row.getCell(j).setCellStyle(bodyStyle);
                maxLengths[j] = Math.max(maxLengths[j], getApproximateWidth(values[j]));
            }


        }


        // 셀 너비를 설정
        for (int i = 0; i < headers.length; i++) {
            sheet.setColumnWidth(i, maxLengths[i] * 256);
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();

        return outputStream;

    }

    // 서버 리스트
    private ByteArrayOutputStream generateServerAll(HttpServletResponse res) throws Exception {
        XSSFWorkbook workbook = new XSSFWorkbook();

        XSSFSheet sheet = workbook.createSheet("Server List"); // 시트 이름

        String[] headers = {"자산 번호", "자산명", "제조사", "자산 상태", "시리얼", "보증기간"};
        int[] maxLengths = new int[headers.length]; // 가장 긴 값으로 셀의 크기를 설정하기 위한 배열

        // 헤더의 길이로 셀 너비 설정g
        for (int i = 0; i < headers.length; i++) {
            maxLengths[i] = headers[i].length();
        }

        // 각 스타일을 설정한다
        XSSFCellStyle headerStyle = createHeaderStyle(workbook);
        XSSFCellStyle bodyStyle = createBodyStyle(workbook);

        // 엑셀의 헤더 배열을 이용해서 엑셀의 셀 위쪽을 설정
        Row headerRow = sheet.createRow(0);
        for (int i = 0; i < headers.length; i++) {
            Cell headerCell = headerRow.createCell(i);
            headerCell.setCellValue(headers[i]);
            headerCell.setCellStyle(headerStyle); // 헤더 스타일
        }


        // 데이터 뿌리기
        List<ITAssetsVO> itAssets = assetRequestService.AssetRequestListSV();
        for (int i = 0; i < itAssets.size(); i++) {
            Row row = sheet.createRow(i + 1);

            // 년차를 계산

            String[] values = {
                    String.valueOf(itAssets.get(i).getAssets_num()),
                    itAssets.get(i).getAssets_name(),
                    itAssets.get(i).getServer_mfg(),
                    itAssets.get(i).getAssets_status(),
                    itAssets.get(i).getAssets_detail_name(),
                    itAssets.get(i).getServer_spec_warranty(),
            };

            // 각 셀에 값을 넣고, 너비도 설정
            for (int j = 0; j < values.length; j++) {
                row.createCell(j).setCellValue(values[j]);
                row.getCell(j).setCellStyle(bodyStyle);
                maxLengths[j] = Math.max(maxLengths[j], getApproximateWidth(values[j]));
            }


        }


        // 셀 너비를 설정
        for (int i = 0; i < headers.length; i++) {
            sheet.setColumnWidth(i, maxLengths[i] * 256);
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();

        return outputStream;

    }

    // 소프트웨어 리스트
    private ByteArrayOutputStream generateSoftwareAll(HttpServletResponse res) throws Exception {
        XSSFWorkbook workbook = new XSSFWorkbook();

        XSSFSheet sheet = workbook.createSheet("Software List"); // 시트 이름

        String[] headers = {"자산 번호", "자산명", "제조사", "자산 상태", "시리얼", "보증기간"};
        int[] maxLengths = new int[headers.length]; // 가장 긴 값으로 셀의 크기를 설정하기 위한 배열

        // 헤더의 길이로 셀 너비 설정g
        for (int i = 0; i < headers.length; i++) {
            maxLengths[i] = headers[i].length();
        }

        // 각 스타일을 설정한다
        XSSFCellStyle headerStyle = createHeaderStyle(workbook);
        XSSFCellStyle bodyStyle = createBodyStyle(workbook);

        // 엑셀의 헤더 배열을 이용해서 엑셀의 셀 위쪽을 설정
        Row headerRow = sheet.createRow(0);
        for (int i = 0; i < headers.length; i++) {
            Cell headerCell = headerRow.createCell(i);
            headerCell.setCellValue(headers[i]);
            headerCell.setCellStyle(headerStyle); // 헤더 스타일
        }


        // 데이터 뿌리기
        List<ITAssetsVO> itAssets = assetRequestService.AssetRequestListSW();
        for (int i = 0; i < itAssets.size(); i++) {
            Row row = sheet.createRow(i + 1);

            // 년차를 계산

            String[] values = {
                    String.valueOf(itAssets.get(i).getAssets_num()),
                    itAssets.get(i).getAssets_name(),
                    itAssets.get(i).getSw_mfg(),
                    itAssets.get(i).getAssets_status(),
                    itAssets.get(i).getSw_spec_seriel(),
                    itAssets.get(i).getSw_spec_warranty()
            };

            // 각 셀에 값을 넣고, 너비도 설정
            for (int j = 0; j < values.length; j++) {
                row.createCell(j).setCellValue(values[j]);
                row.getCell(j).setCellStyle(bodyStyle);
                maxLengths[j] = Math.max(maxLengths[j], getApproximateWidth(values[j]));
            }


        }


        // 셀 너비를 설정
        for (int i = 0; i < headers.length; i++) {
            sheet.setColumnWidth(i, maxLengths[i] * 256);
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();

        return outputStream;

    }

    private ByteArrayOutputStream generateEtcAll(HttpServletResponse res) throws Exception {
        XSSFWorkbook workbook = new XSSFWorkbook();

        XSSFSheet sheet = workbook.createSheet("Etc List"); // 시트 이름

        String[] headers = {"자산 번호", "자산명", "제조사", "자산 상태", "시리얼", "보증기간"};
        int[] maxLengths = new int[headers.length]; // 가장 긴 값으로 셀의 크기를 설정하기 위한 배열

        // 헤더의 길이로 셀 너비 설정g
        for (int i = 0; i < headers.length; i++) {
            maxLengths[i] = headers[i].length();
        }

        // 각 스타일을 설정한다
        XSSFCellStyle headerStyle = createHeaderStyle(workbook);
        XSSFCellStyle bodyStyle = createBodyStyle(workbook);

        // 엑셀의 헤더 배열을 이용해서 엑셀의 셀 위쪽을 설정
        Row headerRow = sheet.createRow(0);
        for (int i = 0; i < headers.length; i++) {
            Cell headerCell = headerRow.createCell(i);
            headerCell.setCellValue(headers[i]);
            headerCell.setCellStyle(headerStyle); // 헤더 스타일
        }


        // 데이터 뿌리기
        List<ITAssetsVO> itAssets = assetRequestService.AssetRequestListETC();
        for (int i = 0; i < itAssets.size(); i++) {
            Row row = sheet.createRow(i + 1);

            // 년차를 계산

            String[] values = {
                    String.valueOf(itAssets.get(i).getAssets_num()),
                    itAssets.get(i).getAssets_name(),
                    itAssets.get(i).getEtc_mfg(),
                    itAssets.get(i).getAssets_status(),
                    itAssets.get(i).getAssets_detail_name(),
                    itAssets.get(i).getEtc_purchase_date()
            };

            // 각 셀에 값을 넣고, 너비도 설정
            for (int j = 0; j < values.length; j++) {
                row.createCell(j).setCellValue(values[j]);
                row.getCell(j).setCellStyle(bodyStyle);
                maxLengths[j] = Math.max(maxLengths[j], getApproximateWidth(values[j]));
            }


        }


        // 셀 너비를 설정
        for (int i = 0; i < headers.length; i++) {
            sheet.setColumnWidth(i, maxLengths[i] * 256);
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();

        return outputStream;

    }

}

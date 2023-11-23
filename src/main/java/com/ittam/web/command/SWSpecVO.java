package com.ittam.web.command;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SWSpecVO {
    private String sw_mfg;
    private String sw_spec_warranty;
    private String sw_spec_seriel;
    private String sw_purchase_date;
    private String sw_price;
}

package com.ittam.web.command;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ETCSpecVO {
    private String etc_mfg;
    private String etc_spec_warranty;
    private String etc_purchase_date;
    private String etc_price;
}

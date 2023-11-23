package com.ittam.web.command;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ServerSpecVO {
    private String server_mfg;
    private String server_spec_warranty;
    private String server_capa;
    private String server_price;
    private String server_purchase_date;
    private String server_interface;
    private String server_average_life;
    private String server_rpm;
    private String server_datarecovery_life;
}

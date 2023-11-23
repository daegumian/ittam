package com.ittam.web.command;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PCSpecVO {
    private String spec_cpu;
    private String spec_ram;
    private String spec_mainboard;
    private String spec_power;
    private String spec_gpu;
    private String spec_hdd;
    private String spec_ssd;
    private String spec_ops;
    private String spec_mfg;
    private String spec_seriel;
    private String spec_warranty;
    private String spec_purchase_date;
}

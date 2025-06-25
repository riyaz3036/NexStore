package com.nextsore.backend.dtos.Response;


import com.nextsore.backend.constants.TextConstants;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SuccessMessageResponseDTO{
    private String message;
    private String status;

    public SuccessMessageResponseDTO(String message) {
        this.status = TextConstants.SUCCESS;
        this.message = message;
    }

}
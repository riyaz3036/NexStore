package com.nextsore.backend.dtos.Response;

import com.nextsore.backend.constants.TextConstants;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Schema(description = "Success response with a single object")
public class SuccessObjectResponseDTO<T> {
    @Schema(description = "The data object")
    private T data;
    private String status;

    public SuccessObjectResponseDTO(T data) {
        this.status = TextConstants.SUCCESS;
        this.data = data;
    }
}
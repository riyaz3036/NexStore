package nexstore.be.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import nexstore.be.constants.RouteConstants;
import nexstore.be.dtos.Variant.SampleVariantResponseDTO;
import nexstore.be.dtos.swagger.preview.PreviewArrayResponseDTO;
import nexstore.be.services.PreviewDataService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(RouteConstants.PREVIEW_DATA_MODULE)
public class PreviewDataController {
    private static final Logger logger = LoggerFactory.getLogger(PreviewDataController.class);

    @Autowired
    private PreviewDataService previewDataService;

    @Operation(summary = "Get sample variants for preview", description = "Returns a list of sample variants for preview purposes.")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Sample variants retrieved successfully", content = @Content(schema = @Schema(implementation = PreviewArrayResponseDTO.class)))
    })
    @GetMapping(RouteConstants.GET_PREVIEW_DATA)
    public ResponseEntity<PreviewArrayResponseDTO> getSampleVariants() {
        List<SampleVariantResponseDTO> variantDTOs = previewDataService.getPreviewVariants();

        PreviewArrayResponseDTO responseDto = PreviewArrayResponseDTO.builder()
                .data(variantDTOs)
                .count(variantDTOs.size())
                .status("success")
                .build();
        return ResponseEntity.ok(responseDto);
    }
}

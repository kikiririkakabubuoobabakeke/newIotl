package com.example.demo.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.entity.FileEntity;
import com.example.demo.service.FileService;

@Controller
public class HomeController {
	@GetMapping("/Home")
	public String Home() {
		return "Home";
	}

	@GetMapping("/Learn")
	public String Learn() {
		return "Learn";
	}

	@GetMapping("/Build")
	public String Build() {
		return "Build";
	}

	@GetMapping("/Connect")
	public String Connect() {
		return "Connect";
	}

	@GetMapping("/BLEled")
	public String blel() {
		return "BLEled";
	}

	@GetMapping("/BLEchara")
	public String blec() {
		return "BLEchara";
	}

	@GetMapping("/BLEmotor")
	public String blem() {
		return "BLEmotor";
	}

	@GetMapping("/BLEradio")
	public String bler() {
		return "BLEradio";
	}

	@GetMapping("/Test")
	public String Test() {
		return "Test2";
	}

	@Autowired
	private FileService fileService;

	@PostMapping("/Setting")
	public String uploadFile(@RequestParam("file") MultipartFile file) throws IOException {
		fileService.saveFile(file.getOriginalFilename(), file.getBytes());
		return "Setting";
	}

	@GetMapping("/Setting")
	public String listFiles(Model model) {
		List<FileEntity> files = fileService.getAllFiles();
		model.addAttribute("files", files);
		return "Setting";
	}

	@GetMapping("/Setting/{id}")
	public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable Long id) {
		FileEntity fileEntity = fileService.getFileById(id);
		if (fileEntity == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileEntity.getFileName() + "\"")
				.body(new ByteArrayResource(fileEntity.getFileContent()));
	}

}

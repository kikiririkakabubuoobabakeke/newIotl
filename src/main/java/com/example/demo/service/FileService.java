package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.FileEntity;
import com.example.demo.repository.FileRepository;

@Service
public class FileService {

	@Autowired
	private FileRepository fileRepository;

	@Transactional
	public void saveFile(String fileName, byte[] fileContent) {
		FileEntity fileEntity = new FileEntity();
		fileEntity.setFileName(fileName);
		fileEntity.setFileContent(fileContent);
		fileRepository.save(fileEntity);
	}

	public List<FileEntity> getAllFiles() {
		return fileRepository.findAll();
	}

	public FileEntity getFileById(Long id) {
		return fileRepository.findById(id).orElse(null);
	}
}

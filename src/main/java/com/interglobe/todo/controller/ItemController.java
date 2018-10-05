package com.interglobe.todo.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


import com.interglobe.todo.domain.Item;
import com.interglobe.todo.exception.ItemNotFoundException;
import com.interglobe.todo.repository.ItemRepository;

@RestController
@RequestMapping("/api/items")
@CrossOrigin
public class ItemController {

	@Autowired ItemRepository repository;
	
	@GetMapping("/id/{id}")
	public Optional<Item> getItem(@PathVariable Integer id) {
		if(!repository.findById(id).isPresent()) {
			throw new ItemNotFoundException("Item Id "+ id +" Not found");
		}
		return repository.findById(id);
	}
	
	@GetMapping("/")
	public List<Item> getAllItem() {
		return repository.findAll();
	}
	
	@GetMapping("/type/{type}")
	public List<Item> getItem(@PathVariable boolean type) {
		if(repository.findByIsPending(type).isEmpty()) {
			throw new ItemNotFoundException("No Item found for Type "+type);
		}
		return repository.findByIsPending(type);
	}
	
	@PostMapping("/")
	public ResponseEntity<Object> addItem(@RequestBody Item item) {
		if(item.getId() != null) {
			throw new ItemNotFoundException("Invalid input - Item Id Not passed");
		}
		Item savedItem = repository.save(item);
		repository.findById(savedItem.getId());
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
		        .buildAndExpand(savedItem.getId()).toUri();
		return ResponseEntity.created(location).build();
	}
	
	@DeleteMapping("/id/{id}")
	public void deleteItem(@PathVariable Integer id) {
		repository.deleteById(id);
	}
	
	@PutMapping("/id/{id}")
	public ResponseEntity<Object> updateItem(@RequestBody Item item, @PathVariable Integer id) {
		if(!repository.findById(id).isPresent()) {
			throw new ItemNotFoundException("Item Id "+ id +"Not found");
		}
		item.setId(id);
		Item updatedItem = repository.save(item);
		repository.findById(updatedItem.getId());
		return ResponseEntity.noContent().build();
	}
}

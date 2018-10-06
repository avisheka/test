package com.interglobe.todo.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
	public List<Item> addItem(@RequestBody Item item) {
		if(item.getId() != null) {
			throw new ItemNotFoundException("Invalid input - Item Id Not passed");
		}
		item.setPending(false);
		repository.save(item);
		return repository.findByIsPending(false);
	}
	
	@PutMapping("/id/{id}")
	public List<List<Item>> updateItem(@RequestBody Item item, @PathVariable Integer id) {
		if(!repository.findById(id).isPresent()) {
			throw new ItemNotFoundException("Item Id "+ id +"Not found");
		}
		item.setId(id);
		repository.save(item);
		List<List<Item>> updatedItemsLists = new ArrayList<>();
		List<Item> pendingList = repository.findByIsPending(false);
		List<Item> completedList = repository.findByIsPending(true);
		updatedItemsLists.add(0, pendingList);
		updatedItemsLists.add(1, completedList);
		return updatedItemsLists;
	}
	
	@DeleteMapping("/type/{type}/id/{id}")
	public List<Item> deleteItem(@PathVariable boolean type, @PathVariable Integer id) {
		if(repository.findByIsPending(type).isEmpty()) {
			throw new ItemNotFoundException("No Item found for Type "+type);
		}
		repository.deleteById(id);
		return repository.findByIsPending(type);
	}
	
}

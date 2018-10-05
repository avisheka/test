package com.interglobe.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.interglobe.todo.domain.Item;
import com.interglobe.todo.repository.ItemRepository;

@SpringBootApplication
public class TodoApplication implements CommandLineRunner {

	@Autowired ItemRepository repository;
	
	public static void main(String[] args) {
		SpringApplication.run(TodoApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		repository.save(new Item("milk","purchase milk - 1 pc", true));
		repository.save(new Item("cycle","fix cycle", true));
		repository.save(new Item("appointment","book appointment", true));
		repository.save(new Item("veggies","get veggies", false));
		repository.save(new Item("laundry","laundry", false));
	}
}

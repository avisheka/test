package com.interglobe.todo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.interglobe.todo.domain.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {
	
	public List<Item> findByIsPending(boolean isPending);

}

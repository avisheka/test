package com.interglobe.todo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
public class ApplicationException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	
	public ApplicationException() {
		
	}
	
	public ApplicationException(String message) {
		super(message);
	}

	public ApplicationException(String message, Throwable ex) {
		super(message, ex);
	}
}

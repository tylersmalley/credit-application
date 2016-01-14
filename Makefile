SHELL := /bin/bash
SOURCE := $(shell find src -type f -name '*.js' -o -name '*.html')

BROWSERIFY = ./node_modules/.bin/browserify

default: install watch

build: public/bundle/main.js public/bundle/test.js public/bundle/style.css

install:
	@npm install

server:
	@node .

watch:
	@while :; do \
		make build && sleep 1; \
	done

clean:
	@rm -f public/build/*

public/bundle/main.js: src/main.js $(SOURCE)
	@$(BROWSERIFY) -t brfs $< -o $@

public/bundle/test.js: src/test.js $(SOURCE)
	@$(BROWSERIFY) -t brfs $< -o $@

public/bundle/style.css: src/style.css
	@cp $^ $@

PHONY: default build install server watch clean

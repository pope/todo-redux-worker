MAKEFLAGS += --warn-undefined-variables -r
.DEFAULT_GOAL := all

.SECONDEXPANSION:
.DELETE_ON_ERROR:
.SUFFIXES:
.ONESHELL:

TS_SOURCES := $(wildcard src/*.ts) $(wildcard src/*/*.ts)

dist/%.js: src/%.ts $(TS_SOURCES) Makefile
	esbuild --bundle $< --outfile=$@ --define:global=globalThis --define:globalThis.DEBUG=false

dist:
	mkdir -p dist

dist/index.html: src/index.html dist
	cp -f $< $@

.PHONY: build
build: dist/ui/index.js dist/worker/index.js dist/index.html

.PHONY: all
all: build

.PHONY: clean
clean:
	-rm -rf dist

.PHONY: dev
dev:
	esbuild --bundle src/ui/index.ts src/worker/index.ts \
		--outdir=dist --servedir=dist --serve=:8080 --watch \
		--define:global=globalThis \
		--define:globalThis.DEBUG=true

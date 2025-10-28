WINSCP = "C:\Program Files (x86)\WinSCP\WinSCP.com"
SCRIPT = deploy.txt
LOG    = deploy.log

build:
	@echo "==> Build Vite..."
	npm run build

deploy: build
	@echo "==> Deploying dist to Hostinger via SFTP..."
	$(WINSCP) /log=$(LOG) /ini=nul /script=$(SCRIPT)
	@echo "==> Deployment complete. See $(LOG)."

clean:
	@echo "==> Cleaning dist..."
	-rmdir /S /Q dist 2> NUL

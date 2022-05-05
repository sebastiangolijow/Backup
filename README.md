# Backup
Script that run every night to backup the DB

This script run every night with a Lamba function made in AWS and it made the backup of the db every night, also it runs a rotate function that rotate 
the backup files deleting the ones that have more that one months old and creating new ones.

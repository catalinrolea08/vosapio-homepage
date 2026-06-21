# CompetiqTracker-Homepage

#Name: competiq.ai
#Name2: PriceVibe



1 - Change html files in src
2 - run command npm run build
3 - right click on build folder git and add to git
4 - commit all files
5- push

only the build folder its deployed. DONT CHANGE files in the BUILD folder.

How to test changes:

go to nginx folder from root
copy zip on disk
extract files
go to nginx-1.19.8\conf and open nginx-homepage.conf
change line root         "C://github//vosapio-homepage//build" to point to your build folder on disk
to run nginx open cmd or powershell and run the start.bat from
C:\github\MemesisAI Nginx\nginx-1.19.8-vosapio
to stop it run stop.bat

The homepage is then served at http://localhost:8085/

Repository
C:\github\vosapio-homepage

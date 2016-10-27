use nezibo;

drop table if exists internettotheme;

create temporary table internettotheme
(internetid int,
internetname varchar(300),
themeid int,
themename varchar(300));

load data local infile 'C:\\Users\\Shawn\\Documents\\nezibo\\internettotheme.csv' into table nezibo.internettotheme
	fields 
		terminated by ','
	lines 
		terminated by '\n'
    ignore 1 lines;

select '' as 'post_id',
baserecords.pid as 'geodir_pid',
baserecords.businessname as 'post_title',
'1' as 'post_author',
'gd_place' as 'post_type',
group_concat(distinct concat_ws(',', replace(categories.categoryname,'&','&amp;'),replace(internettotheme.themename,'&','&amp;')) separator ',') as 'post_category',
if(isnull(chains.stdname),'',chains.stdname) as 'franchise',
if(isnull(group_concat(distinct attr_group separator ',')),'',group_concat(distinct attr_group separator ',')) as 'post_tags', 
if(isnull(paymenttype_condsd),'',paymenttype_condsd) as 'geodir_paymenttypes',
concat(baserecords.housenumber, ' ', if(isnull(baserecords.predirectional),'', concat(baserecords.predirectional,' ')), baserecords.streetname, ' ', baserecords.streettype, if(isnull(baserecords.postdirectional),'', concat(' ', baserecords.postdirectional))) as 'post_address', 
baserecords.city as 'post_city',
baserecords.state as 'post_region',
'United States' as 'post_country', 
baserecords.zip as 'post_zip',
baserecords.latitude as 'post_latitude', 
baserecords.longitude as 'post_longitude', 
concat('(',baserecords.areacode,') ',baserecords.exchangen,'-',baserecords.phonenumber) as 'phone',
if(customattributes.attributetype = 1, customattributes.attribute, '') as 'geodir_email', 
if(customattributes.attributetype = 2, customattributes.attribute, '') as 'geodir_website', 
if(customattributes.attributetype = 4, customattributes.attribute, '') as 'geodir_foursquare', 
if(customattributes.attributetype = 5, customattributes.attribute, '') as 'geodir_yelp', 
if(customattributes.attributetype = 6, customattributes.attribute, '') as 'geodir_linkedin', 
if(customattributes.attributetype = 7, customattributes.attribute, '') as 'geodir_facebook', 
if(customattributes.attributetype = 8, customattributes.attribute, '') as 'geodir_googleplus', 
if(customattributes.attributetype = 9, customattributes.attribute, '') as 'geodir_twitter',
baserecords.tagline as 'post_content'

-- USED for writing files directly to the sever ----
-- into outfile 'C:\\ProgramData\\MySQL\\MySQL Server 5.7\\Uploads\\customquery.csv' -- //activate this line to output to file.
	-- fields terminated by ','
	-- enclosed by '"'
	-- lines terminated by '\n'

from baserecords 
	left join chains on baserecords.chainid = chains.chainid 

    left join (select companypaymenttypes.pid, group_concat(distinct paymenttypes.paymenttype separator ',') as paymenttype_condsd
		from companypaymenttypes 
			inner join paymenttypes on companypaymenttypes.paymenttypeid = paymenttypes.paymenttypeid
		 group by companypaymenttypes.pid) as a on baserecords.pid = a.pid
	
	left join customattributes on baserecords.pid = customattributes.pid


	left join (select companyattributes.pid, concat_ws(',', group_concat(distinct companyattributes.attributename separator ','), group_concat(distinct companyattributes.groupname separator ',')) as attr_group
		from companyattributes group by companyattributes.pid) as b on baserecords.pid = b.pid


	left join (companyheadings, categories, internettotheme)
		on (baserecords.pid = companyheadings.pid and categories.categoryid = companyheadings.categoryid and companyheadings.categoryid = internettotheme.internetid)


where baserecords.streetname != ''

group by baserecords.pid

order by baserecords.pid

limit 50000 offset 54900;